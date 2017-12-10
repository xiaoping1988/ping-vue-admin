import Vue from 'vue'
import Router from 'vue-router'
import { getLoginUser, removeTokenCookie } from '../assets/js/assist'
import Login from '../pages/login'
import Scene from '../pages/scene'
import Test from '../pages/Test.vue'
import SysManage from '../pages/sysmanage'
import Echarts from '../pages/echarts'
import BDMap from '../pages/bdmap'

Vue.use(Router)

const menuType = {
  header: 'headerMenu',
  left: 'leftMenu'
}

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/scene',
      name: 'Scene',
      component: Scene
    },
    {
      path: '/scene/develop',
      name: 'SceneDevelop',
      component: Scene.SceneDevelop
    },
    {
      path: '/sys',
      name: '',
      component: SysManage,
      type: menuType.header,
      children: [
        {path: 'user', name: '用户管理', component: SysManage.User, type: menuType.left},
        {path: 'role', name: '角色管理', component: SysManage.Role, type: menuType.left}
      ]
    },
    {
      path: '/echarts',
      name: '',
      component: Echarts,
      type: menuType.header,
      children: [
        {path: 'dashboard', name: '仪表盘', component: Echarts.Dashboard, type: menuType.left},
        {path: 'line', name: '折线图', component: Echarts.Line, type: menuType.left},
        {path: 'area', name: '面积图', component: Echarts.Area, type: menuType.left},
        {path: 'bar', name: '柱状图', component: Echarts.Bar, type: menuType.left},
        {path: 'linebar', name: '折线&柱状混图', component: Echarts.LineBar, type: menuType.left},
        {path: 'pie', name: '饼图图', component: Echarts.Pie, type: menuType.left}
      ]
    },
    {
      path: '/bdmap',
      name: '',
      component: BDMap,
      type: menuType.header,
      children: [
        {path: 'heat', name: '热力图', component: BDMap.HeatMap, type: menuType.left},
        {path: 'polygon', name: '区域图', component: BDMap.Polygon, type: menuType.left},
        {path: 'pg-heat', name: '区域热力图', component: BDMap.PGHeat, type: menuType.left}
      ]
    }
  ]
})

/**
 * 不做登录校验的路由集合
 * @type {[*]}
 */
const unLoginCheckRoutes = ['/noauth', '/test', '/console']

router.beforeEach(function (to, from, next) {
  // 是否要做登录及权限校验
  let loginCheck = false
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
    }
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
