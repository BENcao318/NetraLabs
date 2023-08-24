const express = require('express')
const router = express.Router()
const users = require('../controller/user.controller')

router.get('/', (req, res) => {
  res.send('User List')
})

router.post('/sign-in', users.signIn)
router.post('/sign-on', users.createUser)
router.post('/update-user-data', users.updateUserData)
router.get('/sign-out', users.signOut)
router.get('/participant-list', users.getParticipantList)

module.exports = router
