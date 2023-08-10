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

    const userInfo = {
      email: req.body.email.toLowerCase(),
      name: req.body.name,
      password: hashedPassword,
    }

    const userData = await User.create(userInfo)

    req.session.user = {
      email: userData.email,
      name: userData.name,
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
    })

    if (user) {
      const passwordMatched = await compare(password, user.dataValues.password)

      if (passwordMatched) {
        const userData = {
          email: user.dataValues.email,
          name: user.dataValues.name,
          role: user.dataValues.role,
          skills: user.dataValues.skills,
          isAdmin: user.dataValues.isAdmin,
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
