import axios from 'axios'
const api = axios.create({ baseURL: 'http://localhost:5000/api' })
let token = null
export function setAuthToken(t) { token = t }

api.interceptors.request.use(function(config) {
  if (token) { config.headers.Authorization = 'Bearer ' + token }
  return config
})

export default api