const { createCanvas } = require('canvas')
const nodemailer = require('nodemailer')

exports.generateAvatar = async (firstName, lastName) => {
  const canvas = createCanvas(100, 100)
  const ctx = canvas.getContext('2d')

  const randomColor = getRandomColor()
  const initials = getInitials(firstName, lastName)

  // Clear canvas and draw a colored circle
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = randomColor
  ctx.beginPath()
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2)
  ctx.fill()

  // Draw initials
  ctx.font = '40px Arial'
  ctx.fillStyle = 'white' // Set the text color to white
  ctx.textAlign = 'center'

  // Calculate the vertical position for perfect center alignment
  const textHeight =
    ctx.measureText('M').actualBoundingBoxAscent +
    ctx.measureText('M').actualBoundingBoxDescent
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2 + textHeight / 2)

  const buffer = canvas.toBuffer('image/png')
  return buffer
}

const getInitials = (firstName, lastName) => {
  return (
    (firstName ? firstName.charAt(0).toUpperCase() : '') +
    (lastName ? lastName.charAt(0).toUpperCase() : '')
  )
}

const getRandomColor = () => {
  const colors = ['#3490dc', '#38c172', '#e3342f', '#9561e2'] // Use your preferred colors
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

const transporter = nodemailer.createTransport({
  service: process.env.TRANSPORTER_SERVICER,
  auth: {
    user: process.env.TRANSPORTER_USERNAME,
    pass: process.env.TRANSPORTER_PASSWORD,
  },
})

exports.sendEmail = (clientUUID, securityCode, email) => {
  const now = new Date()
  const date = now.toString()

  const frontendLink = 'http://localhost:3000'

  const mailOptions = {
    from: process.env.TRANSPORTER_USERNAME,
    to: 'bc6016@mun.ca',
    // to: email,
    subject: `You are invited!`,
    html: `<html><b>Hey there! </b><br> Ben just invited you to join the hackathon team <p><a href="${frontendLink}">click here to access the page</a></p> <p>Your security code: <b>123</b></p></html>`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      return {
        success: false,
        error,
      }
    } else {
      console.log('Email sent: ' + info.response)
      return {
        success: true,
        error: null,
      }
    }
  })
}
