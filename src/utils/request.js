import axios from 'axios'
export const request = (config) => {
  const instance = axios.create({
    baseURL: 'http://liufusong.top:8080/'
  })
  return instance(config)
}
