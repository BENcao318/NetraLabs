import React from 'react'

const TimeZone = ({ timeZone }) => {
  const { label, offset } = timeZone

  const formatOffset = (offset) => {
    const hours = Math.floor(Math.abs(offset) / 60)
    const minutes = Math.abs(offset) % 60

    return `${offset >= 0 ? '+' : '-'}${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <h3>{label}</h3>
      <p>Offset: {formatOffset(offset)}</p>
    </div>
  )
}

export default TimeZone
