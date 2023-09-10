const momentTimeZone = require("moment-timezone")
const moment = require("moment")
const { DateTime } = require("luxon")

export const convertDateString = (dateString, options) => {
  const dateObj = new Date(dateString)
  const formattedDate = dateObj.toLocaleString(undefined, options)

  return formattedDate
}

export const convertDateString2 = (inputDate) => {
  const dateObject = new Date(inputDate)
  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, "0")
  const day = String(dateObject.getDate()).padStart(2, "0")

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
    zone: "utc",
  })
  const utcDeadlineDate = DateTime.fromISO(deadlineUTCDateString, {
    zone: "utc",
  })

  const currentDate = DateTime.now().setZone(userTimeZone)
  const userTimeZoneStartTimeDate = utcStartTimeDate.setZone(userTimeZone)
  const userTimeZoneDeadlineDate = utcDeadlineDate.setZone(userTimeZone)

  const startTimeDaysDifference = userTimeZoneStartTimeDate.diff(
    currentDate,
    "days"
  ).days

  const deadlineDaysDifference = userTimeZoneDeadlineDate.diff(
    currentDate,
    "days"
  ).days

  let formattedString = ""
  if (startTimeDaysDifference > 0) {
    if (startTimeDaysDifference > 1) {
      const roundedTime = Math.floor(startTimeDaysDifference)
      formattedString =
        roundedTime === 1
          ? "starting in 1 day"
          : `starting in ${roundedTime} days`
    } else {
      const hoursDifference = userTimeZoneStartTimeDate.diff(
        currentDate,
        "hours"
      ).hours
      const roundedTime = Math.floor(hoursDifference)
      formattedString =
        roundedTime === 1
          ? "starting in 1 hour"
          : `starting in ${roundedTime} hours`
    }
  } else if (deadlineDaysDifference > 0) {
    if (deadlineDaysDifference > 1) {
      const roundedTime = Math.floor(deadlineDaysDifference)
      formattedString =
        roundedTime === 1 ? "about 1 day left" : `${roundedTime} days left`
    } else {
      const hoursDifference = userTimeZoneDeadlineDate.diff(
        currentDate,
        "hours"
      ).hours
      const roundedTime = Math.floor(hoursDifference)
      formattedString =
        roundedTime === 1 ? "about 1 hour left" : `${roundedTime} hours left`
    }
  } else {
    formattedString = "hackathon has ended"
  }

  return formattedString
}

export const convertDateObjectToUTCString = (date, timeZone) => {
  const isoString = date.toISOString()
  const formattedString = isoString.replace("T", " ").replace(/\.\d+Z$/, "") // Remove milliseconds and 'Z'

  const localMoment = momentTimeZone.tz(formattedString, timeZone)
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

  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return `${formattedStartDate} - ${formattedEndDate}, ${startDate.getFullYear()}`
}

export const timeAgo = (dateString) => {
  const pastDate = moment(dateString)
  const currentDate = moment()

  const duration = moment.duration(currentDate.diff(pastDate))

  if (duration.asMinutes() < 1) {
    return "Just now"
  } else if (duration.asHours() < 1) {
    return `${Math.floor(duration.asMinutes())} minute${
      duration.asMinutes() >= 2 ? "s" : ""
    } ago`
  } else if (duration.asDays() < 1) {
    return `${Math.floor(duration.asHours())} hour${
      duration.asHours() >= 2 ? "s" : ""
    } ago`
  } else if (duration.asWeeks() < 1) {
    return `${Math.floor(duration.asDays())} day${
      duration.asDays() >= 2 ? "s" : ""
    } ago`
  } else if (duration.asMonths() < 1) {
    return `${Math.floor(duration.asWeeks())} week${
      duration.asWeeks() >= 2 ? "s" : ""
    } ago`
  } else if (duration.asYears() < 1) {
    return `${Math.floor(duration.asMonths())} month${
      duration.asMonths() >= 2 ? "s" : ""
    } ago`
  } else {
    return `${Math.floor(duration.asYears())} year${
      duration.asYears() >= 2 ? "s" : ""
    } ago`
  }
}
