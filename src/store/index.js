import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//获取与修改城市定位/小区名称/地区id相关数据
const LocationAbout = {
  namespaced: true,
  strict: true,
  state: {
    //当前选中城市名
    cityName: '北京',
    //当前选中城市id
    cityId: '"AREA|88cff55c-aaa4-e2e0"',
    //选中小区名
    communityName: '请输入小区名',
    //区域id
    community: ''
  },
  getters: {},
  mutations: {
    CHANGE_CITY(state, { cityName, cityId }) {
      state.cityName = cityName
      state.cityId = cityId
    },
    GET_RES(state, payload) {
      state.communityName = payload.communityName
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
