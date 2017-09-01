import axios from 'axios'

const AMUserPreUrl = '/api/user/'
const AMRolePreUrl = '/api/role/'
const AMResourcePreUrl = '/api/resource/'

export const AMUrls = {
  user: {
    list: AMUserPreUrl + 'list',
    getById: AMUserPreUrl + 'get-by-userid',
    grant: AMUserPreUrl + 'grant'
  },
  role: {
    list: AMRolePreUrl + 'list',
    getById: AMRolePreUrl + 'get-by-roleid',
    getByIdAll: AMRolePreUrl + 'get-by-roleid-all',
    deleteById: AMRolePreUrl + 'delete-by-roleid',
    addOrUpdateRole: AMRolePreUrl + 'save-or-update',
    checkRepeatName: AMRolePreUrl + 'check-repeat-name'
  },
  resource: {
    getResourceTree: AMResourcePreUrl + 'tree',
    queryApps: AMResourcePreUrl + 'list-apps',
    getById: AMResourcePreUrl + 'get-by-resourceid',
    deleteById: AMResourcePreUrl + 'delete-by-resourceid',
    addOrUpdateResource: AMResourcePreUrl + 'save-or-update',
    checkRepeatPageId: AMResourcePreUrl + 'check-repeat-pageid'
  }
}

export const queryUserList = params => { return axios.post(AMUrls.user.list, params).then(res => res.data) }
export const getUserById = params => { return axios.post(AMUrls.user.getById, params).then(res => res.data) }
export const grantRoles = params => { return axios.post(AMUrls.user.grant, params).then(res => res.data) }
export const queryRoleList = params => { return axios.post(AMUrls.role.list, params).then(res => res.data) }
export const getRoleById = params => { return axios.post(AMUrls.role.getById, params).then(res => res.data) }
export const getRoleByIdAll = params => { return axios.post(AMUrls.role.getByIdAll, params).then(res => res.data) }
export const deleteRoleById = params => { return axios.post(AMUrls.role.deleteById, params).then(res => res.data) }
export const addOrUpdateRole = params => { return axios.post(AMUrls.role.addOrUpdateRole, params).then(res => res.data) }
export const checkRepeatName = params => { return axios.post(AMUrls.role.checkRepeatName, params).then(res => res.data) }
export const getResourceTree = params => { return axios.post(AMUrls.resource.getResourceTree, params).then(res => res.data) }
export const queryApps = params => { return axios.post(AMUrls.resource.queryApps, params).then(res => res.data) }
export const getResourceById = params => { return axios.post(AMUrls.resource.getById, params).then(res => res.data) }
export const deleteResourceById = params => { return axios.post(AMUrls.resource.deleteById, params).then(res => res.data) }
export const addOrUpdateResource = params => { return axios.post(AMUrls.resource.addOrUpdateResource, params).then(res => res.data) }
export const checkRepeatPageId = params => { return axios.post(AMUrls.resource.checkRepeatPageId, params).then(res => res.data) }
