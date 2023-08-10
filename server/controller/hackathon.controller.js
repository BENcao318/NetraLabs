const db = require('../models')
const hackathon = require('../models/hackathon')
const { Hackathon, User } = db
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

exports.createHackathon = async (req, res) => {
  const hackathonData = req.body

  try {
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
      user_id: user.dataValues.id,
    })

    console.log('Hackathon created: ', newHackathon.toJSON())
    res.status(200).send({
      success: true,
      message: 'Hackathon create success',
    })
  } catch (error) {
    console.log('Error creating the hackathon:', error)
    res.status(500).send({
      message:
        error.message || 'Some error occurred while creating the hackathon',
    })
  }
}

exports.getHackathonsByUserEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
      include: {
        model: Hackathon,
      },
    })

    if (user) {
      const hackathons = user.Hackathons.map(
        (hackathonData) => hackathonData.dataValues
      ).map(({ user_id, ...rest }) => rest)
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
