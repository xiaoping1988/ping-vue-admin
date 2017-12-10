import {loginUrls} from '../api'

const LoginUsers = [
  {
    name: '张某某',
    email: 'admin@daojia.com',
    password: '123456',
    username: 'admin',
    token: '43e3ec99-c8a3-47ec-afd7-775b7c073285'
  }
]

export default {
  /**
   * mock bootstrap
   */
  bootstrap (mock) {
    // 登录
    mock.onPost(loginUrls.login).reply(config => {
      let {username, password} = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          let msg = '请求成功'
          let hasUser = LoginUsers.some(u => {
            if (u.username !== username || u.password !== password) {
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

    // 登出
    mock.onPost(loginUrls.logout).reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, { code: 0, msg: 'success', result: {} }])
      })
    })
  }
}
