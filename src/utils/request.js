import axios from 'axios'
const timeout = 5000
export const request = (config) => {
  const instance = axios.create({
    baseURL: 'http://liufusong.top:8080/', //url = base url + request url
    timeout
  })
  return instance(config)
}
