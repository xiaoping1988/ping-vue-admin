import axios from 'axios'
import qs from 'qs'
import { getLoginUser, removeTokenCookie } from '../assets/js/assist'

// Add a request interceptor
axios.defaults.baseURL = ''
if (process.env.NODE_ENV === 'development') {
  // 与后端做联调时打开
  // axios.defaults.baseURL = '后端服务器域名'
}
/*
对后端请求做拦截
 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(function (config) {
  let user = getLoginUser()
  if (user) {
    if (config.data) {
      config.data.token = user.token
    } else {
      config.data = {token: user.token}
    }
  }
  if (config.data) {
    // console.log(config.data)
    config.data = qs.stringify(config.data)
    // console.log(config.data)
  }
  return config
}, function (error) {
  return Promise.reject(error)
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.code !== 0) {
    if (response.data.code === 400 || response.data.code === 401) {
      removeTokenCookie()
      window.location.href = '/'
    }
  }
  return response
}, function (error) {
  return Promise.reject(error)
});

export default axios
