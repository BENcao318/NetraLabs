export const convertDateString = (dateString) => {
  const dateObj = new Date(dateString)

  // Options for date and time formatting
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  // Convert the date to a formatted string
  const formattedDate = dateObj.toLocaleString(undefined, options)

  return formattedDate
}