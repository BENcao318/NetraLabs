const db = require('../models')
const { Hackathon } = db

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

//todo Add owner_id reference to hackathon to connect to users table
exports.createHackathon = async (req, res) => {
  const hackathonData = req.body

  try {
    const newHackathon = await Hackathon.create({
      name: hackathonData.name,
      description: hackathonData.description,
      rules: hackathonData.rules,
      tagline: hackathonData.tagline,
      manager_email: hackathonData.email,
      time_zone: hackathonData.timeZone,
      start_time: hackathonData.startDate, //todo change to startTime
      deadline: hackathonData.deadline,
      prizes: hackathonData.prizes,
      judges: hackathonData.judges,
      requirements: hackathonData.requirements,
      about: hackathonData.about, //todo not needed
      partners: hackathonData.partners,

      //todo add location and uuid
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

exports.getHackathonList = async (req, res) => {
  const userData = req.body

  const testList = [
    {
      name: 'Virtual Inter-University Coding Hackathon',
      manager_email: 'manager@example.com',
      time_zone: JSON.stringify({ EST: 'Eastern Standard Time' }),
      start_time: new Date('2023-08-06T08:00:00Z'),
      deadline: new Date('2023-08-08T23:59:59Z'),
    },
  ]

  try {
    console.log('user+++++++++++++:', userData)

    res.status(200).send({
      success: true,
      message: 'success',
      message2: testList,
    })
  } catch (error) {
    console.log('Error getting the hackathon list:', error)
    res.status(500).send({
      message:
        error.message || 'Some error occurred while getting the hackathon list',
    })
  }
}
