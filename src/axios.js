import _axios from 'axios'
import store from './store/index'
import router from '@/router'

const axios = _axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

axios.interceptors.response.use(null, function (error) {
  console.log(`🔀 interception`)
  let originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    console.log('🐛: store.state.auth', store.state.auth)
    return store.dispatch('auth/refresh').then(accessToken => {
      if (accessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
        return axios.request(originalRequest)
      }
    })
  }
  store.dispatch('auth/disconnect')
  router.push({ name: 'home' })
  return Promise.reject(error)
})

export function setAuthorizationHeader (accessToken) {
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export default axios
