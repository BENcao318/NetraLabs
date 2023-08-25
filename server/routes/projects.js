const express = require('express')
const router = express.Router()
const projects = require('../controller/project.controller')

router.post('/create-project', projects.createProject)
router.post('/list', projects.getProjectsByUserId)
router.post('/inivitation-list', projects.getProjectsWithTeamByUserId)
router.post('/get-project-data', projects.getProjectByProjectId)
router.post('/update-project', projects.updateProjectById)
router.post('/create-new-team', projects.createNewTeam)
router.post('/invite-new-member', projects.inviteNewMember)
router.post('/invite-participant', projects.inviteParticipant)

module.exports = router
