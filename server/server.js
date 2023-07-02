require('dotenv').config({ path: __dirname + '/.env' })

const PORT = process.env.PORT || 8080
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const app = express()

// const userRouter = require('./routes/users')
// const taskRouter = require('./routes/tasks')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  const allowedDomains = ['http://localhost:3000']
  const origin = req.headers.origin
  if (allowedDomains.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  //set CORS
  // cors({
  //   origin: '','',
  //   methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
  //   credentials: true,
  // })

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Accept'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
})
app.use(
  session({
    proxy: true,
    secret: 'user-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure:
        process.env.NODE_ENV && process.env.NODE_ENV == 'production'
          ? true
          : false,
      sameSite:
        process.env.NODE_ENV && process.env.NODE_ENV == 'production'
          ? 'none'
          : 'lax',
    },
  })
)

// const db = require('./models')

const isAuth = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.send({
      success: false,
    })
  }
}

app.get('/me', isAuth, (req, res) => {
  const user = req.session.user
  res.status(200).send({
    success: true,
    message: 'Login success',
    messge2: null,
    user,
  })
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Root access to backend ' })
})

app.listen(PORT, async () => {
  console.log(`App listening on port: ${PORT}`)
  // await db.sequelize.authenticate()
  console.log('Database Connected!')
})
