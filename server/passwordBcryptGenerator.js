const bcrypt = require('bcrypt')

const password = 'test1234'
const saltRounds = 10

bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
  if (err) {
    console.error(err)
    return
  }

  console.log(hashedPassword)
})
