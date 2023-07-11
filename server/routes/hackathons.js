const express = require('express')
const router = express.Router()
const hackathons = require('../controller/hackathon.controller')

router.get('/', hackathons.findLatestHackathon)

module.exports = router
