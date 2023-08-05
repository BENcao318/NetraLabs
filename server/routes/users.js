const express = require('express')
const router = express.Router()
const users = require('../controller/user.controller')

router.get('/', (req, res) => {
  res.send('User List')
})

router.post('/sign-in', users.signIn)
router.post('/sign-on', users.createUser)

module.exports = router
