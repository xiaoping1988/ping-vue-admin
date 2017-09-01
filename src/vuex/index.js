import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    breadcrumb: [],
    pageAuth: {},
    routerAuth: [],
    loginUser: null
  },
  mutations: {
    setBreadcrumb (state, bc) {
      state.breadcrumb = bc
    },
    setPageAuth (state, pageAuthArray) {
      pageAuthArray.forEach(p => {
        state.pageAuth[p] = true
      })
    },
    setRouterAuth (state, routerAuthArray) {
      state.routerAuth = routerAuthArray
    },
    setLoginUser (state, user) {
      state.loginUser = user
    }
  }
})

export {store}
