import axios from 'axios'
import React from 'react'

export const UserProfileImg = ({
  firstName,
  lastName,
  width,
  height,
  textSize,
}) => {
  const getInitials = (firstName, lastName) => {
    return (
      (firstName ? firstName.charAt(0).toUpperCase() : '') +
      (lastName ? lastName.charAt(0).toUpperCase() : '')
    )
  }

  const getRandomColor = () => {
    const colors = [
      'bg-blue-600',
      'bg-green-600',
      'bg-orange-600',
      'bg-purple-600',
      // Add more colors as needed
    ]
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  const initials = getInitials(firstName, lastName)
  const randomColorClass = getRandomColor()

  return (
    <div
      className={`w-${width} h-${height} rounded-full flex justify-center items-center text-white text-${textSize} font-bold bg-green-600 mr-6`}
    >
      {initials}
    </div>
  )
}
