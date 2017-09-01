import axios from 'axios'

const userAuthPreUrl = '/api/user/'
export const userAuthUrls = {
  login: userAuthPreUrl + 'login',
  logout: userAuthPreUrl + 'logout',
  checkPageRouter: userAuthPreUrl + 'check-page-router',
  checkPageRouters: userAuthPreUrl + 'check-page-routers',
  checkPageIds: userAuthPreUrl + 'check-page-ids'
}

export const requestLogin = params => { return axios.post(userAuthUrls.login, params).then(res => res.data) }
export const requestLogout = params => { return axios.post(userAuthUrls.logout, params).then(res => res.data) }
export const checkPageRouter = params => { return axios.post(userAuthUrls.checkPageRouter, params).then(res => res.data) }
export const checkPageRouters = params => { return axios.post(userAuthUrls.checkPageRouters, params).then(res => res.data) }
export const checkPageIds = params => { return axios.post(userAuthUrls.checkPageIds, params).then(res => res.data) }
