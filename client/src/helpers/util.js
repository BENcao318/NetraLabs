const moment = require('moment-timezone')
const { DateTime } = require('luxon')

export const convertDateString = (dateString, options) => {
  const dateObj = new Date(dateString)

  // Options for date and time formatting
  // const options = {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   hour12: true
  // };

  // Convert the date to a formatted string
  const formattedDate = dateObj.toLocaleString(undefined, options)

  return formattedDate
}

export const convertDateString2 = (inputDate) => {
  const dateObject = new Date(inputDate)
  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, '0')
  const day = String(dateObject.getDate()).padStart(2, '0')

  // Format the date as "yyyy-MM-dd"
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export const calculateDaysForHackathon = (
  startTimeUTCDateString,
  deadlineUTCDateString,
  userTimeZone
) => {
  const utcStartTimeDate = DateTime.fromISO(startTimeUTCDateString, {
    zone: 'utc',
  })
  const utcDeadlineDate = DateTime.fromISO(deadlineUTCDateString, {
    zone: 'utc',
  })

  const currentDate = DateTime.now().setZone(userTimeZone)
  const userTimeZoneStartTimeDate = utcStartTimeDate.setZone(userTimeZone)
  const userTimeZoneDeadlineDate = utcDeadlineDate.setZone(userTimeZone)

  const startTimeDaysDifference = userTimeZoneStartTimeDate.diff(
    currentDate,
    'days'
  ).days

  const deadlineDaysDifference = userTimeZoneDeadlineDate.diff(
    currentDate,
    'days'
  ).days

  let formattedString = ''
  if (startTimeDaysDifference > 0) {
    if (startTimeDaysDifference > 1) {
      const roundedTime = Math.floor(startTimeDaysDifference)
      formattedString =
        roundedTime === 1
          ? 'starting in 1 day'
          : `starting in ${roundedTime} days`
    } else {
      const hoursDifference = userTimeZoneStartTimeDate.diff(
        currentDate,
        'hours'
      ).hours
      const roundedTime = Math.floor(hoursDifference)
      formattedString =
        roundedTime === 1
          ? 'starting in 1 hour'
          : `starting in ${roundedTime} hours`
    }
  } else if (deadlineDaysDifference > 0) {
    if (deadlineDaysDifference > 1) {
      const roundedTime = Math.floor(deadlineDaysDifference)
      formattedString =
        roundedTime === 1 ? 'about 1 day left' : `${roundedTime} days left`
    } else {
      const hoursDifference = userTimeZoneDeadlineDate.diff(
        currentDate,
        'hours'
      ).hours
      const roundedTime = Math.floor(hoursDifference)
      formattedString =
        roundedTime === 1 ? 'about 1 hour left' : `${roundedTime} hours left`
    }
  } else {
    formattedString = 'hackathon has ended'
  }

  return formattedString
}

export const convertDateObjectToUTCString = (date, timeZone) => {
  const isoString = date.toISOString()
  const formattedString = isoString.replace('T', ' ').replace(/\.\d+Z$/, '') // Remove milliseconds and 'Z'

  const localMoment = moment.tz(formattedString, timeZone)
  const utcTime = localMoment.utc()

  return utcTime.format()
}

export const calculateTotalPrize = (prizesArr) => {
  if (!prizesArr) return 0
  let total = 0
  prizesArr.map((prize) => (total += prize.value))
  return total
}

export const convertStartTimeAndDeadlineToStringForInfoCard = (
  startTime,
  deadline
) => {
  const startDate = new Date(startTime)
  const endDate = new Date(deadline)

  const formattedStartDate = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  const formattedEndDate = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return `${formattedStartDate} - ${formattedEndDate}, ${startDate.getFullYear()}`
}
