import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//获取与修改城市定位/小区名称/地区id相关数据
const LocationAbout = {
  namespaced: true,
  strict: true,
  state: {
    cityName: '北京',
    communityName: '请输入小区名',
    community: ''
  },
  getters: {},
  mutations: {
    CHANGE_CITY(state, payload) {
      state.cityName = payload
    },
    GET_RES(state, payload) {
      state.communityName = payload.val
      state.community = payload.community
    }
  },
  actions: {
    changeCity({ commit }, payload) {
      commit('CHANGE_CITY', payload)
    }
  },
  modules: {}
}
//发布房屋相关数据
const PublishAbout = {
  namespaced: true,
  strict: true,
  state: {
    main: {}
  },
  mutations: {
    SAVE_CONDITIONS(state, payload) {
      state.main = payload
    }
  },
  actions: {}
}
export default new Vuex.Store({
  modules: {
    LocationAbout,
    PublishAbout
  }
})
