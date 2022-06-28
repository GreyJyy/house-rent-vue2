import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    name: '北京'
  },
  getters: {},
  mutations: {
    CHANGECITY(state, payload) {
      state.name = payload
    }
  },
  actions: {
    changeCity({ commit }, payload) {
      commit('CHANGECITY', payload)
    }
  },
  modules: {}
})
