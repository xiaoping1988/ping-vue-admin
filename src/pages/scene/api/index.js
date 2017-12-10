import {get, post} from '../../../axios/ajax'

const sceneBaseUrl = '/api/scene'
export const sceneUrls = {
  list: sceneBaseUrl + '/list',
  saveOrUpdate: sceneBaseUrl + '/save-or-update',
  flowChart: sceneBaseUrl + '/flow-chart'
}

/**
 * 分页查询场景实验列表
 * @param params
 */
export const listScene = params => { return get(sceneUrls.list, params) }

/**
 * 新增或编辑场景
 * @param params
 */
export const saveOrUpdateScene = params => { return post(sceneUrls.saveOrUpdate, params) }

/**
 * 新增实验,获取默认流程图
 */
export const getSceneDefaultFlowNodes = () => {
  let time = new Date().getTime()
  let node1 = 'jspnode_' + time + '_1'
  let node2 = 'jspnode_' + time + '_2'
  let node3 = 'jspnode_' + time + '_3'
  let nodes = [
    {nodeCode: 'db_hive', nodeDomId: node1, name: 'hive', x: 500, y: 20, parents: [], children: [node2]},
    {nodeCode: 'fp_normalization', nodeDomId: node2, name: '归一化', x: 500, y: 200, parents: [node1], children: [node3]},
    {nodeCode: 'ds_random', nodeDomId: node3, name: '随机分组', x: 500, y: 400, parents: [node2], children: []}
  ]
  return nodes
}

/**
 * 新增或编辑场景
 * @param params
 */
export const getSceneFlowChart = params => { return post(sceneUrls.flowChart, params) }
