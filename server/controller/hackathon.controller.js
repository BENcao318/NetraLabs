const db = require('../models')
const { Hackathon, User, Project, UserHackathon, UserProject } = db
const users = require('./user.controller')

exports.findLatestHackathon = async (req, res) => {
  try {
    const latestRecord = await Hackathon.findOne({
      order: [['created_at', 'DESC']],
    })

    res.status(200).json(latestRecord)
  } catch (error) {
    console.error('Error fetching latest record:', error)
  }
}

exports.createAHackathon = async (req, res) => {
  const hackathonData = req.body

  try {
    const isNameTaken = await isHackathonNameTaken(hackathonData.name)
    if (!isNameTaken) {
      const user = await users.getUserByEmail(hackathonData.user.email)

      const newHackathon = await Hackathon.create({
        name: hackathonData.name,
        description: hackathonData.description,
        rules: hackathonData.rules,
        tagline: hackathonData.tagline,
        manager_email: hackathonData.email,
        location: hackathonData.location,
        time_zone: hackathonData.timeZone,
        start_time: hackathonData.startTime,
        deadline: hackathonData.deadline,
        prizes: hackathonData.prizes,
        judges: hackathonData.judges,
        requirements: hackathonData.requirements,
        partners: hackathonData.partners,
        launched: false,
        company: user.company,
      })

      const updatedUserData = user.created_hackathons_id
      updatedUserData.push(newHackathon.id)

      const updatedUser = await User.update(
        {
          created_hackathons_id: updatedUserData,
        },
        {
          where: {
            id: user.id,
          },
        }
      )
      console.log('Updated User:', updatedUser)
      console.log('Hackathon created: ', newHackathon.toJSON())
      res.status(200).send({
        success: true,
        message: 'Hackathon create success',
      })
    } else {
      res.status(400).send({
        message: 'Hackathon name is taken',
      })
    }
  } catch (error) {
    console.log('Error creating the hackathon:', error)
    res.status(500).send({
      message:
        error.message || 'Some error occurred while creating the hackathon',
    })
  }
}

exports.getCreatedHackathonsByAdminEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    })

    const createdHackathons = await Hackathon.findAll({
      where: {
        id: user.created_hackathons_id,
      },
    })
    if (user) {
      const hackathons = createdHackathons
        .map((hackathonData) => hackathonData.dataValues)
        .map(({ user_id, ...rest }) => rest)
      res.status(200).send({
        success: true,
        message: 'success',
        message2: hackathons,
      })
    } else {
      return null
    }
  } catch (error) {
    console.log('Error getting the hackathon list:', error)
    res.status(500).send({
      message:
        error.message || 'Some error occurred while getting the hackathon list',
    })
  }
}

exports.updateHackathonByUUID = async (req, res) => {
  const hackathonData = req.body

  try {
    const hackathon = await Hackathon.update(
      {
        name: hackathonData.name,
        description: hackathonData.description,
        rules: hackathonData.rules,
        tagline: hackathonData.tagline,
        manager_email: hackathonData.manager_email,
        location: hackathonData.location,
        time_zone: hackathonData.time_zone,
        start_time: hackathonData.start_time, // new
        deadline: hackathonData.deadline, // new
        prizes: hackathonData.prizes,
        judges: hackathonData.judges,
        requirements: hackathonData.requirements,
        about: hackathonData.about,
        partners: hackathonData.partners,
        resources: hackathonData.resources,
        launched: hackathonData.launched,
      },
      {
        where: {
          id: hackathonData.id,
        },
      }
    )
    if (hackathon) {
      res.status(200).send({
        success: true,
        message: 'success',
        message2: null,
      })
    } else {
      return null
    }
  } catch (error) {
    console.log('Error updating the hackathon:', error)
    res.status(500).send({
      message:
        error.message || 'Some error occurred while updating the hackathon',
    })
  }
}

exports.launchHackathon = async (req, res) => {
  const hackathonData = req.body

  try {
    const hackathon = await Hackathon.update(
      {
        name: hackathonData.name,
        description: hackathonData.description,
        rules: hackathonData.rules,
        tagline: hackathonData.tagline,
        manager_email: hackathonData.manager_email,
        location: hackathonData.location,
        time_zone: hackathonData.time_zone,
        start_time: hackathonData.start_time, // new
        deadline: hackathonData.deadline, // new
        prizes: hackathonData.prizes,
        judges: hackathonData.judges,
        requirements: hackathonData.requirements,
        about: hackathonData.about,
        partners: hackathonData.partners,
        resources: hackathonData.resources,
        launched: true,
      },
      {
        where: {
          id: hackathonData.id,
        },
      }
    )
    if (hackathon) {
      res.status(200).send({
        success: true,
        message: 'success',
        message2: null,
      })
    } else {
      return null
    }
  } catch (error) {
    console.log('Error updating the hackathon:', error)
    res.status(500).send({
      message:
        error.message || 'Some error occurred while updating the hackathon',
    })
  }
}

exports.getListOfLaunchedHackathons = async (req, res) => {
  const { userEmail } = req.body

  try {
    if (!userEmail) return null

    const launchedHackathons = await Hackathon.findAll({
      where: {
        launched: true,
      },
    })

    const launchedHackathonsId = launchedHackathons.map(
      (hackathon) => hackathon.id
    )
    let updatedLaunchedHackathons = []

    if (launchedHackathonsId.length !== 0) {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
        include: [
          {
            model: Hackathon,
            attributes: ['id'],
            where: {
              id: launchedHackathonsId,
            },
          },
        ],
      })

      const joinedHackathonIds =
        user !== null ? user.Hackathons.map((hackathon) => hackathon.id) : []

      updatedLaunchedHackathons = launchedHackathons.map((hackathon) => {
        let joined = false
        if (
          Array.isArray(joinedHackathonIds) &&
          joinedHackathonIds.includes(hackathon.id)
        ) {
          joined = true
        }
        return {
          ...hackathon.dataValues,
          joined,
        }
      })
    }

    res.status(200).send({
      success: true,
      message: 'success',
      message2: updatedLaunchedHackathons,
    })
  } catch (error) {
    console.log('Error retrieving the hackathon:', error)
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving the hackathon',
    })
  }
}

const isHackathonNameTaken = async (name) => {
  try {
    const existingHackathon = await Hackathon.findOne({
      where: {
        name: name,
      },
    })

    return existingHackathon !== null
  } catch (error) {
    console.error('Error checking hackathon name:', error)
    throw error
  }
}

exports.joinAHackathon = async (req, res) => {
  const { userEmail, hackathonId } = req.body

  try {
    // console.log(userEmail, hackathonID)
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    })

    const hackathon = await Hackathon.findByPk(hackathonId)
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found.' })
    }

    const userhackathon = await UserHackathon.create({
      user_id: user.id,
      hackathon_id: hackathonId,
    })

    // const updatedUser = await User.findOne({
    //   where: {
    //     email: userEmail,
    //   },
    //   include: [
    //     {
    //       model: Hackathon,
    //       attributes: ['id'],
    //     },
    //   ],
    // })

    // const joinedHackathonIds = updatedUser.Hackathons.map(
    //   (hackathon) => hackathon.id
    // )

    // req.session.user = {
    //   ...req.session.user,
    //   joinedHackathons: joinedHackathonIds,
    // }
    // if (user) {
    //   if (!user.hackathons.find((hackathon) => (hackathon.id = hackathonId))) {
    //     const updatedHackathons = [...user.hackathons, hackathonId]
    //     await user.update({ hackathons: updatedHackathons })
    //   } else {
    //     return res
    //       .status(403)
    //       .send({ message: 'Hackathon has been signed by you.' })
    //   }
    // }

    res.status(200).send({
      success: true,
      message: 'success',
    })
  } catch (error) {
    console.log('Error joining the hackathon:', error)
    res.status(500).send({
      message:
        error.message || 'Some error occurred while joining the hackathon',
    })
  }
}

exports.getProjectByUserEmailAndHackathon = async (req, res) => {
  const { userEmail, hackathonId } = req.body

  try {
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    })

    const hackathon = await Hackathon.findByPk(hackathonId)

    if (!user || !hackathon) {
      return null
    }

    const projects = await Project.findAll({
      where: { hackathon_id: hackathonId },
      include: [
        {
          model: User,
          where: { id: user.id },
        },
      ],
    })

    res.status(200).send({
      success: true,
      message: 'success',
      message2: projects,
    })
  } catch (error) {
    console.log('Error joining the hackathon:', error)
    res.status(500).send({
      message:
        error.message || 'Some error occurred while joining the hackathon',
    })
  }
}

exports.getSubmissions = async (req, res) => {
  const { userId, hackathonId } = req.body

  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  try {
    if (userId !== req.session.user.id) {
      res.status(400).send({
        message: 'Some error occurred while matching the session with user id',
      })
      return null
    }

    const projects = await Project.findAll({
      where: { hackathon_id: hackathonId, submitted: true },
      include: [
        {
          model: User,
        },
      ],
    })

    res.status(200).send({
      success: true,
      message: 'success',
      message2: projects,
    })
  } catch (error) {
    console.log('Error joining the hackathon:', error)
    res.status(500).send({
      message:
        error.message || 'Some error occurred while joining the hackathon',
    })
  }
}
