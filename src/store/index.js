import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'

Vue.use(Vuex)
// 使用vuex状态管理token
export default new Vuex.Store({
  state: {
    //   用户信息（token   refresh_token）
    user: auth.getUser()
  },
  mutations: {
    //   存储用户信息
    setUser (state, user) {
      // 更新state的状态
      state.user = user
      //   跟新本地存储
      auth.setUser(user)
    },
    // 清除用户信息
    delUser (state) {
      // 跟新state 的状态
      state.user = {}
      // 跟新本地存储
      auth.delUser()
    }
  },
  actions: {},
  modules: {}
})
