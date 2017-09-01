import axios from 'axios'
import qs from 'qs'
import {getLoginUser} from '@/assets/js/assist.js'

export const categorys = [
  {categoryId: 1, categoryName: '速运业务'}
  // {categoryId: 2, categoryName: '家政业务'},
  // {categoryId: 3, categoryName: '丽人业务'}
]
const abtestBaseInfoPreUrl = '/api/abtest-baseinfo/'
const abtestCategoryPreUrl = '/api/abtest-category/'
export const abtestUrls = {
  baseinfo: {
    getPagelist: abtestBaseInfoPreUrl + 'get-pagelist',
    delete: abtestBaseInfoPreUrl + 'delete',
    getBaseinfoByid: abtestBaseInfoPreUrl + 'get-baseinfo-byid',
    testName: abtestBaseInfoPreUrl + 'test-name',
    save: abtestBaseInfoPreUrl + 'save',
    getData: abtestBaseInfoPreUrl + 'get-data',
    getDataDetail: abtestBaseInfoPreUrl + 'get-data-detail',
    export: abtestBaseInfoPreUrl + 'export-data-excel'
  },
  category: {
    getParameterBy: abtestCategoryPreUrl + 'get-parameter-by',
    getIndexBy: abtestCategoryPreUrl + 'get-index-by'
  }
}
export const queryStrategy = params => { return axios.post(abtestUrls.baseinfo.getPagelist, params).then(res => res.data) }
export const deleteStrategy = params => { return axios.post(abtestUrls.baseinfo.delete, params).then(res => res.data) }
export const getStrategy = params => { return axios.post(abtestUrls.baseinfo.getBaseinfoByid, params).then(res => res.data) }
export const checkTestNameRepeat = params => { return axios.post(abtestUrls.baseinfo.testName, params).then(res => res.data) }
export const createOrUpdateStrategy = params => { return axios.post(abtestUrls.baseinfo.save, params).then(res => res.data) }
export const queryParameters = params => { return axios.post(abtestUrls.category.getParameterBy, params).then(res => res.data) }
export const queryStrategyData = params => { return axios.post(abtestUrls.baseinfo.getData, params).then(res => res.data) }
export const queryStrategyIndexData = params => { return axios.post(abtestUrls.baseinfo.getDataDetail, params).then(res => res.data) }
export const queryStrategyIndex = params => { return axios.post(abtestUrls.category.getIndexBy, params).then(res => res.data) }
export const exportAbtestData = params => { window.location.href = axios.defaults.baseURL + abtestUrls.baseinfo.export + '?token=' + getLoginUser().token + '&' + qs.stringify(params) }
