const express = require('express')
const router = express.Router()
const projects = require('../controller/project.controller')

router.post('/create-project', projects.createProject)
router.post('/list', projects.getProjectsByUserEmail)
router.post('/get-project-data', projects.getProjectById)

module.exports = router
