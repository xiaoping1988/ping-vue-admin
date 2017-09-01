// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {store} from './vuex'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Mock from './mock'
import axios from './axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/custom.css'
import VueParticles from 'vue-particles'
import PingUI from 'ping-ui'
import MyPlugin from './assets/js/plugin'

Vue.use(VueParticles)
Vue.use(PingUI)
Vue.use(iView)
Vue.use(MyPlugin)

Vue.config.productionTip = false

// if (process.env.NODE_ENV === 'development') {
  Mock.bootstrap()
// }

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

