import axios from 'axios'
import qs from 'qs'
import {getLoginUser} from '../assets/js/assist.js'

export const get = (url, params) => { return axios.get(url, params).then(res => res.data) }
export const post = (url, params) => { return axios.post(url, params).then(res => res.data) }
export const download = (url, params) => { window.location.href = axios.defaults.baseURL + url + '?token=' + getLoginUser().token + '&' + qs.stringify(params) }
