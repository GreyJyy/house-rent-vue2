import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//获取与修改城市定位/小区名称/地区id相关数据
const LocationAbout = {
  namespaced: true,
  strict: true,
  state: {
    name: '北京',
    area: '请输入小区名',
    id: ''
  },
  getters: {},
  mutations: {
    CHANGE_CITY(state, payload) {
      state.name = payload
    },
    GET_RES(state, payload) {
      state.area = payload.val
      state.id = payload.id
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
    types: [],
    typeValues: [],
    floors: [],
    floorValues: [],
    directions: [],
    directionValues: [],
    supportings: [],
    supportingValues: []
  },
  mutations: {
    SAVE_LABELS(state, payload) {
      ;[state.floors, state.supportings, state.directions, state.types] =
        payload
    },
    SAVE_VALUES(state, payload) {
      ;[
        state.floorValues,
        state.supportingValues,
        state.directionValues,
        state.typeValues
      ] = payload
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
