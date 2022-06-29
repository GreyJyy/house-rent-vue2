import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    name: '北京',
    area: '请输入小区名',
    id: ''
  },
  getters: {},
  mutations: {
    CHANGECITY(state, payload) {
      state.name = payload
    },
    GETRES(state, payload) {
      state.area = payload.val
      state.id = payload.id
    }
  },
  actions: {
    changeCity({ commit }, payload) {
      commit('CHANGECITY', payload)
    }
  },
  modules: {}
})
