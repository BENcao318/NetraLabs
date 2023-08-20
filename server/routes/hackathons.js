const express = require('express')
const router = express.Router()
const hackathons = require('../controller/hackathon.controller')

router.get('/', hackathons.findLatestHackathon)

router.post('/new', hackathons.createAHackathon)

router.post('/list', hackathons.getCreatedHackathonsByAdminEmail)

router.post('/update', hackathons.updateHackathonByUUID)

router.post('/launch', hackathons.launchHackathon)

router.get('/launched-hackathons', hackathons.getListOfLaunchedHackathons)

router.post('/join', hackathons.joinHackathon)

router.post('/get-project', hackathons.getProjectByUserEmailAndHackathon)

module.exports = router
