import Vue from 'vue'
import Router from 'vue-router'
import { getLoginUser, removeTokenCookie } from '../assets/js/assist'
import { checkPageRouter, checkPageRouters } from '../pages/login/api/login'
import Login from '../pages/login/Login'
import NoAuth from '../pages/NoAuth'
import SysManage from '../pages/sysmanage'
import Console from '../pages/console'

Vue.use(Router)

var menuType = {
  header: 'headerMenu',
  left: 'leftMenu'
}

var router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
      name: '未匹配的路由',
      component: Login
    },
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/noauth',
      name: '没有权限',
      component: NoAuth
    },
    {
      path: '/console',
      name: '',
      component: Console,
      type: menuType.header,
      children: []
    },
    {
      path: '/sys-manage',
      name: '',
      component: SysManage,
      type: menuType.header,
      children: [
        { path: 'user', name: '用户管理', component: SysManage.User, type: menuType.left },
        { path: 'user/detail', name: '用户信息', component: SysManage.UserDetail },
        { path: 'user/grant', name: '用户授权', component: SysManage.UserGrant },
        { path: 'role', name: '角色管理', component: SysManage.Role, type: menuType.left },
        { path: 'role/detail', name: '角色信息', component: SysManage.RoleDetail },
        { path: 'role/create-or-update', name: '创建或者编辑角色', component: SysManage.RoleCreateOrUpdate },
        { path: 'resource', name: '资源管理', component: SysManage.Resource, type: menuType.left }
      ]
    }
  ]
})

/**
 * 不做登录校验的路由集合
 * @type {[*]}
 */
const unLoginCheckRoutes = ['/noauth', '/test', '/console'];

// 前端路由的权限控制
router.beforeEach(function (to, from, next) {
  // 是否要做登录及权限校验
  let loginCheck = true
  unLoginCheckRoutes.forEach(r => {
    if (to.path === '/' || (r !== '/' && to.path.startsWith(r))) {
      loginCheck = false
    }
  })
  if (loginCheck) {
    let user = getLoginUser()
    if (user === null) {
      removeTokenCookie()
      next('/')
      return
    }
    checkPageRouter({pageRouter: to.path}).then(res => {
      if (res.code === 0 && res.result) {
        // 点击header导航栏菜单默认指向children中第一个有权限的左菜单
        let _route = {}
        router.options.routes.forEach(r => {
          if (r.path === to.path && r.type === menuType.header) _route = r
        })
        let _children = _route.children
        if (_children && _children.length > 0) {
          let _routers = []
          for (let key in _children) {
            if (_children[key].type === menuType.left) {
              _routers.push(to.path + '/' + _children[key].path)
            }
          }
          if (_routers.length > 0) {
            checkPageRouters({pageRouters: _routers.toString()}).then(res => {
              if (res.code === 0 && res.result.length > 0) {
                next(res.result[0])
              } else {
                next()
              }
            }).catch(error => {
              console.log(error)
              removeTokenCookie()
              next('/')
            })
          } else {
            next()
          }
        } else {
          next()
        }
      } else {
        next('/noauth')
      }
    }).catch(error => {
      console.log(error)
      removeTokenCookie()
      next('/')
    })
  } else {
    let _route = {}
    router.options.routes.forEach(r => {
      if (r.path === to.path) _route = r
    })
    if (_route === {} || _route.children === undefined || _route.children.length === 0) {
      next()
    } else {
      let _firstR = _route.children[0]
      next(to.path + '/' + _firstR.path)
    }
  }
})
export default router
