const bcrypt = require('bcrypt')

const password = 'bensde123'
const saltRounds = 10

bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
  if (err) {
    console.error(err)
    return
  }

  console.log(hashedPassword)
})
