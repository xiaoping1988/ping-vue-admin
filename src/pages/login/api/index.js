import {post} from '../../../axios/ajax'

const loginBaseUrl = '/api'
export const loginUrls = {
  login: loginBaseUrl + '/login',
  logout: loginBaseUrl + '/logout'
}

/**
 * 登录请求
 * @param params
 */
export const requestLogin = params => { return post(loginUrls.login, params) }
/**
 * 登出请求
 * @param params
 */
export const requestLogout = params => { return post(loginUrls.logout, params) }
