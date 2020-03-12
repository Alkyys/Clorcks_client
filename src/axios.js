import _axios from 'axios'

const axios = _axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

export function setAuthorizationHeader (token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export default axios
