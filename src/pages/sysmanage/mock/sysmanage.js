import qs from 'qs'
import {AMUrls} from '../api/sysmanage'

const users = [
  { userId: '1', accountType: 'ldap', userName: 'yige', name: '一哥', department: '技术部', city: '北京' },
  { userId: '2', accountType: 'ldap', userName: 'xiaoer', name: '小二', department: '技术部', city: '北京' },
  { userId: '3', accountType: 'ldap', userName: 'zhangsan', name: '张三', department: '技术部', city: '北京' },
  { userId: '4', accountType: 'ldap', userName: 'lisi', name: '李四', department: '技术部', city: '北京' },
  { userId: '5', accountType: 'ldap', userName: 'wangwu', name: '王五', department: '技术部', city: '北京' },
  { userId: '6', accountType: 'ldap', userName: 'zhaoliu', name: '赵六', department: '人力部', city: '北京' },
  { userId: '7', accountType: 'ldap', userName: 'tianqi', name: '田七', department: '人力部', city: '北京' },
  { userId: '8', accountType: 'ldap', userName: 'wangba', name: '王八', department: '人力部', city: '北京' },
  { userId: '9', accountType: 'ldap', userName: 'jiujiu', name: '李九', department: '行政部', city: '北京' },
  { userId: '10', accountType: 'ldap', userName: 'wangshi', name: '王十', department: '行政部', city: '北京' },
  { userId: '11', accountType: 'ldap', userName: 'zhaoshiyi', name: '赵十一', department: '行政部', city: '北京' },
  { userId: '12', accountType: 'ldap', userName: 'zhangshier', name: '张十二', department: '财务部', city: '北京' },
  { userId: '13', accountType: 'ldap', userName: 'tianse', name: '田十三', department: '财务部', city: '北京' }
]

const roles = [
  { roleId: '3', name: '管理员', desc: '系统管理所有权限', appId: '1', appName: '系统管理', updator: '张三', updateTime: new Date().getTime() },
  { roleId: '4', name: '普通用户', desc: '系统管理只读权限', appId: '1', appName: '系统管理', updator: '张三', updateTime: new Date().getTime() }
]

const resources = [
  {
    title: '系统管理',
    checked: false,
    expand: true,
    resource: {
      resourceId: '1',
      pageId: 'sys_manage',
      pageRouter: '/sys-manage',
      apiUrl: '',
      pid: '',
      sortNum: 1,
      name: '系统管理',
      creatorName: '张三',
      ctime: new Date().getTime(),
      modifiorName: '张三',
      utime: new Date().getTime()
    },
    children: [
      {
        title: '用户管理',
        checked: false,
        expand: true,
        resource: {
          resourceId: '2',
          pageId: 'sys_manage_user',
          pageRouter: '/sys-manage/user',
          apiUrl: '',
          pid: '1',
          sortNum: 1,
          name: '用户管理',
          creatorName: '张三',
          ctime: new Date().getTime(),
          modifiorName: '张三',
          utime: new Date().getTime()

        },
        children: [
          {
            title: '用户列表',
            checked: true,
            expand: true,
            resource: {
              resourceId: '3',
              pageId: 'sys_manage_user_grant',
              pageRouter: '/sys-manage/user',
              apiUrl: '/api/sys-manage/user',
              pid: '2',
              sortNum: 1,
              name: '用户列表',
              creatorName: '张三',
              ctime: new Date().getTime(),
              modifiorName: '张三',
              utime: new Date().getTime()

            },
            children: []
          },
          {
            title: '分配角色',
            checked: false,
            expand: true,
            resource: {
              resourceId: '9',
              pageId: 'sys_manage_user_grant',
              pageRouter: '/sys-manage/user-grant',
              apiUrl: '/api/sys-manage/user/grant',
              pid: '2',
              sortNum: 2,
              name: '分配角色',
              creatorName: '张三',
              ctime: new Date().getTime(),
              modifiorName: '张三',
              utime: new Date().getTime()

            },
            children: []
          }
        ]
      },
      {
        title: '角色管理',
        checked: false,
        expand: true,
        resource: {
          resourceId: '4',
          pageId: 'sys_manage_role',
          pageRouter: '/sys-manage/role',
          apiUrl: '',
          pid: '1',
          sortNum: 2,
          name: '角色管理',
          creatorName: '张三',
          ctime: new Date().getTime(),
          modifiorName: '张三',
          utime: new Date().getTime()

        },
        children: [
          {
            title: '角色列表',
            checked: false,
            expand: true,
            resource: {
              resourceId: '11',
              pageId: 'sys_manage_role_create',
              pageRouter: '/sys-manage/role-create',
              apiUrl: '/api/sys-manage/role',
              pid: '4',
              sortNum: 1,
              name: '角色列表',
              creatorName: '张三',
              ctime: new Date().getTime(),
              modifiorName: '张三',
              utime: new Date().getTime()

            },
            children: []
          },
          {
            title: '创建角色',
            checked: false,
            expand: true,
            resource: {
              resourceId: '5',
              pageId: 'sys_manage_role_create',
              pageRouter: '/sys-manage/role-create',
              apiUrl: '/api/sys-manage/role/create',
              pid: '4',
              sortNum: 2,
              name: '创建角色',
              creatorName: '张三',
              ctime: new Date().getTime(),
              modifiorName: '张三',
              utime: new Date().getTime()

            },
            children: []
          }
        ]
      }
    ]
  }
]

const Resource = function (obj) {
  this.title = obj.name
  this.checked = true
  this.expand = true
  this.resource = {}
  this.resource.resourceId = obj.resourceId ? obj.resourceId : new Date().getTime()
  if (!obj.resourceId) obj.resourceId = this.resource.resourceId
  this.resource.pageId = obj.pageId
  this.resource.pageRouter = obj.pageRouter
  this.resource.apiUrl = obj.apiUrl
  this.resource.sortNum = obj.sortNum
  this.resource.pid = obj.pid
  this.resource.name = obj.name
  this.resource.creatorName = '张某某'
  this.resource.ctime = new Date().getTime()
  this.resource.utime = new Date().getTime()
  this.resource.modifiorName = '张某某'
  this.children = []
}
export default {
  updateResource (resource, _resources) {
    for (let key in _resources) {
      if (_resources[key].resource.resourceId.toString() === resource.resource.resourceId.toString()) {
        resource.children = _resources[key].children
        _resources[key] = resource
        break
      } else {
        if (_resources[key].children && _resources[key].children.length > 0) {
          this.updateResource(resource, _resources[key].children)
        }
      }
    }
  },
  addResource (resource, resourceId, _resources) {
    if (resourceId === '0') {
      _resources.push(resource)
      return
    }
    for (let key in _resources) {
      if (_resources[key].resource.resourceId.toString() === resource.resource.pid.toString()) {
        _resources[key].children.push(resource)
        break
      } else {
        if (_resources[key].children && _resources[key].children.length > 0) {
          this.addResource(resource, resourceId, _resources[key].children)
        }
      }
    }
  },
  deleteResourceById (resourceId, _resources) {
    let index
    for (let key in _resources) {
      if (_resources[key].resource.resourceId.toString() === resourceId.toString()) {
        index = key
        break
      } else {
        if (_resources[key].children && _resources[key].children.length > 0) {
          this.deleteResourceById(resourceId, _resources[key].children)
        }
      }
    }
    if (index) _resources.splice(index, 1)
  },
  getResourceById (resourceId, _resources) {
    let res = {}
    for (let key in _resources) {
      if (_resources[key].resource.resourceId.toString() === resourceId.toString()) {
        res = _resources[key].resource
        break
      } else {
        if (_resources[key].children && _resources[key].children.length > 0) {
          res = this.getResourceById(resourceId, _resources[key].children)
          if (res.resourceId) break
        }
      }
    }
    return res
  },
  copyObject (obj) {
    let result = {}
    Object.assign(result, obj)
    // Object.keys(obj).forEach(key => {
    //   result[key] = obj[key]
    // })
    return result
  },
  /**
   * mock bootstrap
   */
  bootstrap (mock) {
    mock.onPost(AMUrls.user.list).reply(config => {
      let {name, page, pageSize} = qs.parse(config.data)
      let startIndex = (page - 1) * pageSize
      let endIndex = startIndex + pageSize
      return new Promise((resolve, reject) => {
        let res = {}
        let data = []
        if (name && name.trim() !== '') {
          users.forEach(u => {
            if (u.userName.indexOf(name) !== -1 || u.name.indexOf(name) !== -1) data.push(u)
          })
        } else {
          data = users
        }
        let pageData = []
        data.forEach((item, index) => {
          if ((index + 1) > startIndex && index < endIndex) {
            pageData.push(item)
          }
        })
        res.amount = data.length
        res.list = pageData
        resolve([200, { code: 0, msg: 'success', result: res }])
      })
    })

    mock.onPost(AMUrls.user.getById).reply(config => {
      let {userId} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let res = {}
        users.forEach(u => {
          if (u.userId.toString() === userId) res = this.copyObject(u)
        })
        let _roles = []
        roles.forEach((r, index) => {
          if (index % 2 === 0) {
            _roles.push(this.copyObject(r))
          }
        })
        res.roles = _roles
        res.roles.forEach(r => {
          r.operator = '张三'
          r.createTime = new Date().getTime()
        })

        resolve([200, { code: 0, msg: 'success', result: res }])
      })
    })

    mock.onPost(AMUrls.user.grant).reply(config => {
      let {userId, roleIds} = qs.parse(config.data)
      console.log(qs.parse(config.data))
      return new Promise((resolve, reject) => {
        resolve([200, { code: 0, msg: 'success', result: '' }])
      })
    })

    mock.onPost(AMUrls.role.list).reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, { code: 0, msg: 'success', result: roles }])
      })
    })

    mock.onPost(AMUrls.role.getById).reply(config => {
      let {roleId} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let res = {}
        roles.forEach(u => {
          if (u.roleId.toString() === roleId) res = this.copyObject(u)
        })
        let _users = []
        users.forEach((u, index) => {
          if (index % 2 === 0) _users.push(this.copyObject(u))
        })
        res.users = _users
        resources.forEach(r => {
          if (r.resource.resourceId === res.appId) res.resourceTree = r
        })
        resolve([200, { code: 0, msg: 'success', result: res }])
      })
    })

    mock.onPost(AMUrls.role.getByIdAll).reply(config => {
      let {roleId} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let res = {}
        roles.forEach(u => {
          if (u.roleId.toString() === roleId) res = this.copyObject(u)
        })
        let _users = []
        users.forEach((u, index) => {
          if (index % 2 === 0) _users.push(this.copyObject(u))
        })
        res.users = _users
        resources.forEach(r => {
          if (r.resource.resourceId === res.appId) res.resourceTree = r
        })
        resolve([200, { code: 0, msg: 'success', result: res }])
      })
    })

    mock.onPost(AMUrls.role.deleteById).reply(config => {
      let {roleId} = qs.parse(config.data)
      console.log('delete roleId:' + roleId)
      return new Promise((resolve, reject) => {
        let _index
        roles.forEach((u, index) => {
          if (u.roleId.toString() === roleId) _index = index
        })
        if (_index !== undefined) {
          roles.splice(_index, 1)
          resolve([200, { code: 0, msg: 'success', result: '删除成功' }])
        } else {
          resolve([200, { code: 1, msg: 'success', result: '删除失败' }])
        }
      })
    })

    mock.onPost(AMUrls.role.addOrUpdateRole).reply(config => {
      let obj = qs.parse(config.data)
      console.log(obj)
      return new Promise((resolve, reject) => {
        if (obj.roleId) { // 修改
          roles.forEach(r => {
            if (r.roleId.toString() === obj.roleId) {
              r.name = obj.name
              r.updator = '小张'
              r.updateTime = new Date().getTime()
            }
          })
        } else { // 新增
          let _appName = ''
          resources.forEach(r => {
            if (r.resource.resourceId.toString() === obj.appId) _appName = r.resource.name
          })
          roles.push({roleId: new Date().getTime() + '', name: obj.name, desc: obj.desc, appId: obj.appId, appName: _appName, updator: '张某某', updateTime: new Date().getTime()})
        }
        resolve([200, { code: 0, msg: 'success', result: '保存成功' }])
      })
    })

    mock.onPost(AMUrls.role.checkRepeatName).reply(config => {
      let {name, appId, roleId} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let _repeat = false
        if (roleId) { // 修改
          roles.forEach(r => {
            if (r.name === name && r.appId.toString() === appId && r.roleId.toString() !== roleId) _repeat = true
          })
        } else { // 新增
          roles.forEach(r => {
            if (r.name === name && r.appId.toString() === appId) _repeat = true
          })
        }
        if (_repeat) {
          resolve([200, { code: 100, msg: 'failed', result: '名称重复' }])
        } else {
          resolve([200, { code: 0, msg: 'success', result: '保存成功' }])
        }
      })
    })

    mock.onPost(AMUrls.resource.getResourceTree).reply(config => {
      let {resourceId} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let _sysTree = []
        if (resourceId && resourceId.trim() !== '') {
          resources.forEach(r => {
            if (r.resource.resourceId.toString() === resourceId) _sysTree.push(r)
          })
        } else {
          _sysTree = resources
        }
        resolve([200, { code: 0, msg: 'success', result: _sysTree }])
      })
    })

    mock.onPost(AMUrls.resource.queryApps).reply(config => {
      return new Promise((resolve, reject) => {
        let _apps = []
        resources.forEach(r => {
          _apps.push(r.resource)
        })
        resolve([200, { code: 0, msg: 'success', result: _apps }])
      })
    })

    mock.onPost(AMUrls.resource.getById).reply(config => {
      let {resourceId} = qs.parse(config.data)
      console.log(resourceId)
      return new Promise((resolve, reject) => {
        let res = this.getResourceById(resourceId, resources)
        let _roles = []
        roles.forEach(r => {
          _roles.push(this.copyObject(r))
        })
        res.roles = _roles
        console.log(res)
        resolve([200, { code: 0, msg: 'success', result: res }])
      })
    })

    mock.onPost(AMUrls.resource.deleteById).reply(config => {
      let {resourceId} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        this.deleteResourceById(resourceId, resources)
        resolve([200, { code: 0, msg: 'success', result: '删除成功!' }])
      })
    })

    mock.onPost(AMUrls.resource.addOrUpdateResource).reply(config => {
      let obj = qs.parse(config.data)
      console.log(obj)
      return new Promise((resolve, reject) => {
        if (obj.resourceId) { // 修改
          this.updateResource(new Resource(obj), resources)
        } else { // 新增
          this.addResource(new Resource(obj), obj.pid, resources)
        }
        resolve([200, { code: 0, msg: 'success', result: obj.resourceId }])
      })
    })

    mock.onPost(AMUrls.resource.checkRepeatPageId).reply(config => {
      let {pageId, resourceId} = qs.parse(config.data)
      console.log(qs.parse(config.data))
      return new Promise((resolve, reject) => {
        resolve([200, { code: 0, msg: 'success', result: '' }])
      })
    })
  }
}
