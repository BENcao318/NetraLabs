const { createCanvas } = require('canvas')

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
