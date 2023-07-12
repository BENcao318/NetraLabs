import axios from 'axios'

const getBaseUrl = () => {
  let url
  switch (process.env.NODE_ENV) {
    case 'production':
      url = 'production url'
      break
    case 'development':
    default:
      url = 'http://localhost:8080'
  }

  return url
}
//set up connections with axios create
const serverAPI = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
})

export default serverAPI