const { generateHeadshot, generateAvatar } = require('../helpers/utils')
const db = require('../models')
const { User, Hackathon } = db
const Op = db.Sequelize.Op
const { hash, compare } = require('bcrypt')

exports.createUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  try {
    const email = await User.findAll({
      where: {
        email: req.body.email.toLowerCase(),
      },
    })

    if (email.length !== 0) {
      return res.status(403).send({ message: 'Email already exist.' })
    }

    let hashedPassword = await hash(req.body.password, 10)
    // let avatarBuffer = await generateAvatar(
    //   req.body.firstName,
    //   req.body.lastName
    // )

    const userInfo = {
      email: req.body.email.toLowerCase(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      // avatar: avatarBuffer,
    }

    const userData = await User.create(userInfo)
    console.log('userData+++++++++++++++++ ', userData)

    req.session.user = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    }

    res.status(200).send({
      success: true,
      message: 'Signup success',
      messge2: null,
      user: req.session.user,
    })
  } catch (err) {
    console.log('err message:', err.message)
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User',
    })
  }
}

exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({
      where: {
        email,
      },
      include: {
        model: Hackathon,
        attribute: ['id'],
      },
    })

    if (user) {
      const passwordMatched = await compare(password, user.dataValues.password)

      if (passwordMatched) {
        const userData = {
          email: user.dataValues.email,
          firstName: user.dataValues.firstName,
          lastName: user.dataValues.lastName,
          avatar: user.dataValues.avatar,
          role: user.dataValues.role,
          skills: user.dataValues.skills,
          isAdmin: user.dataValues.isAdmin,
          createdHackathons: user.dataValues.created_hackathons_id,
        }

        req.session.user = userData
        req.session.save()
        res.status(200).send({
          success: true,
          message: 'Login success',
          messge2: null,
          user: userData,
        })
      } else {
        res.send({
          success: false,
          message: 'Login Failed',
          message2: 'Email and password did not match.',
        })
      }
    } else {
      res.send({
        success: false,
        message: 'Login Failed',
        message2: 'Email and password did not match.',
      })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send({
      message: `Error retrieving User with email=${email}, ${err}`,
    })
  }
}

exports.getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    })

    return user
  } catch (error) {
    throw error
  }
}

exports.getHackathonsByUserEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
      include: {
        model: Hackathon,
        as: 'hackathons',
      },
    })

    if (user) {
      return user.Hackathons
    } else {
      return null
    }
  } catch (error) {
    throw error
  }
}

exports.updateUserData = async (req, res) => {
  const { firstName, lastName, avatar, role, skills, hackathons } = req.body

  try {
    const userData = await User.update(
      {
        firstName: firstName,
        lastName: lastName,
        avatar: avatar,
        role: role,
        skills: skills,
        hackathons: hackathons,
      },
      {
        where: {
          email: req.session.user.email,
        },
        returning: true,
      }
    )

    if (userData) {
      const userDataValues = userData[1][0].dataValues
      const attributesToOmit = ['id', 'password', 'createdAt', 'updatedAt']
      const returnToFEUserData = { ...userDataValues }

      attributesToOmit.forEach((attribute) => {
        delete returnToFEUserData[attribute]
      })

      res.status(200).send({
        success: true,
        message: 'Update user data success',
        messge2: null,
        userData: returnToFEUserData,
      })
    } else {
      return null
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating User data: ${err}`,
    })
    console.log(err.message)
  }
}

exports.signOut = async (req, res) => {
  req.session.destroy()
  res.status(200).send({
    success: true,
    message: 'Signout success',
    message2: null,
  })
}
