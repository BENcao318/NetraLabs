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
