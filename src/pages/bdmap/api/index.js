import {get, post} from '../../../axios/ajax'

const mapBaseUrl = '/api/map'
export const mapUrls = {
  heat: mapBaseUrl + '/heat',
  polygon: mapBaseUrl + '/polygon',
  pgHeat: mapBaseUrl + '/pg-heat'
}

/**
 * 获取热力图数据
 * @param params
 */
export const getHeatMapData = params => { return get(mapUrls.heat, params) }
/**
 * 获取区域图数据
 * @param params
 */
export const getPloygonMapData = params => { return get(mapUrls.polygon, params) }
/**
 * 获取区域热力图数据
 * @param params
 */
export const getPGHeatMapData = params => { return get(mapUrls.pgHeat, params) }
