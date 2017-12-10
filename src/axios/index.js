import axios from 'axios'
import { getLoginUser, removeTokenCookie } from '../assets/js/assist'
import {notifyError} from '../assets/js/vueGlobal'

// Add a request interceptor
axios.defaults.baseURL = ''
if (process.env.NODE_ENV === 'development') {
}
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(function (config) {
  let user = getLoginUser()
  if (user) {
    if (config.data) {
      config.data.token = user.token
    } else {
      config.data = {token: user.token}
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (response.data) {
    if (response.data.code === 0) {
      return response
    } else {
      if (response.data.code === 400 || response.data.code === 401) { // token失效
        removeTokenCookie()
        window.location.href = '/'
      } else {
        notifyError(response.data.msg)
        return Promise.reject(response.data.msg)
      }
    }
  } else {
    vue.$notify.error({
      title: '错误提示',
      message: 'response error'
    })
    return Promise.reject(new Error('response error'))
  }
}, function (error) {
  return Promise.reject(error)
});

export default axios
