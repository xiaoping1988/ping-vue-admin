import qs from 'qs'
import {userAuthUrls} from '../api/login'

const LoginUsers = [
  {
    name: '张某某',
    email: 'admin@daojia.com',
    password: '123456',
    userName: 'admin',
    token: '43e3ec99-c8a3-47ec-afd7-775b7c073285'
  }
]

export default {
  /**
   * mock bootstrap
   */
  bootstrap (mock) {
    // 登录
    mock.onPost(userAuthUrls.login).reply(config => {
      let {userName, passwd} = qs.parse(config.data)
      console.log(qs.parse(config.data))
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          let msg = '请求成功'
          let hasUser = LoginUsers.some(u => {
            if (u.userName !== userName || u.password !== passwd) {
              msg = '账号或密码错误'
              return false
            }
            user = u
            return true
          })

          if (hasUser) {
            resolve([200, { code: 0, msg: msg, result: user }])
          } else {
            resolve([200, { code: 100, msg: msg, result: {} }])
          }
        }, 500)
      })
    })

    // 登录
    mock.onPost(userAuthUrls.logout).reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, { }])
      })
    })

    // 检查用户的路由权限
    mock.onPost(userAuthUrls.checkPageRouter).reply(config => {
      let {pageRouter} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        resolve([200, { code: 0, msg: 'success', result: true }])
      })
    })

    // 检查用户的路由权限
    mock.onPost(userAuthUrls.checkPageRouters).reply(config => {
      let {pageRouters} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        resolve([200, { code: 0, msg: 'success', result: pageRouters.split(',') }])
      })
    })

    // 检查用户的路由权限
    mock.onPost(userAuthUrls.checkPageIds).reply(config => {
      let {pageIds} = qs.parse(config.data)
      return new Promise((resolve, reject) => {
        let _auth = {}
        let _ids = pageIds.split(',')
        if (_ids) {
          _ids.forEach(id => {
            _auth[id] = true
          })
        }
        resolve([200, { code: 0, msg: 'success', result: _auth }])
      })
    })
  }
}
