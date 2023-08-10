const express = require('express')
const router = express.Router()
const hackathons = require('../controller/hackathon.controller')

router.get('/', hackathons.findLatestHackathon)

router.post('/new', hackathons.createHackathon)

router.post('/list', hackathons.getHackathonsByUserEmail)

router.post('/update', hackathons.updateHackathonByUUID)

module.exports = router
