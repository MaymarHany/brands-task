/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'

export default function axiosSetUp() {
  axios.defaults.baseURL = 'https://interview.intelligent-systems-solutions.com/api'
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken')
    const lang = localStorage.getItem('language_code')

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
      // eslint-disable-next-line no-param-reassign
      config.headers['content-lang'] = lang
      // config.headers.setAttribute('Authorization', token)
    }
    return config
  }, error => Promise.reject(error))
}

axios.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config
  if (error.response.status === 401 && originalRequest.url.includes('refresh-token')) {
    localStorage.removeItem('accessToken')
    router.push('/login')
    return Promise.reject(error)
  } if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user_info')
    router.push({ name: 'login' })
    // await store.dispatch('login/refreshToken')
    return axios(originalRequest)
  }
  return Promise.reject(error)
})
