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

exports.createHackathon = async (req, res) => {
  try {
    // const latestRecord = await Hackathon.findOne({
    //   order: [['created_at', 'DESC']],
    // });
    console.log('hackathon36')
    console.log(req.body)

    res.status(200)
  } catch (error) {
    console.error('Error fetching latest record:', error)
  }
}
