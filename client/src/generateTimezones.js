const moment = require('moment-timezone')
const fs = require('fs')

// Get all available timezones from moment-timezone
const allTimezones = moment.tz.names()

// Create an array of timezone objects in the specified format
const timezoneList = allTimezones.map((timezone) => {
  const timeZoneData = moment.tz(timezone).utcOffset()
  const timeZoneAbbr = moment.tz(timezone).format('z')
  const parts = timezone.split('/')
  const city = parts.length >= 2 ? parts.pop() : parts[0]
  const region = parts.join('/')
  const offsetHours = Math.floor(Math.abs(timeZoneData) / 60)
  const offsetMinutes = Math.abs(timeZoneData) % 60
  const offsetSign = timeZoneData >= 0 ? '+' : '-'
  const offsetFormatted = `${offsetSign}${offsetHours
    .toString()
    .padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`
  return {
    value: timezone,
    label: `(GMT${offsetFormatted}) ${city}`,
    offset: timeZoneData,
    abbrev: timeZoneAbbr,
    altName: city.replace(/_/g, ' '),
  }
})

// Write the timezoneList to a JSON file
const jsonContent = JSON.stringify(timezoneList, null, 2)
fs.writeFileSync('timezones.json', jsonContent, 'utf8')

console.log('JSON file generated successfully!')
