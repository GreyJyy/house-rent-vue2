import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
//获取与修改城市定位/小区名称/地区id相关数据
const LocationAbout = {
  namespaced: true,
  strict: true,
  state: {
    //token信息
    token: '',
    //当前选中城市的信息(名称/全拼/短拼/城市id)
    defaultCityInfo: {
      label: '北京',
      pinyin: 'beijing',
      short: 'bj',
      value: 'AREA|88cff55c-aaa4-e2e0'
    },
    //选中小区名
    communityName: '请输入小区名',
    //区域id
    community: ''
  },
  mutations: {
    CHANGE_CITY(state, { cityName, cityId }) {
      state.defaultCityInfo.label = cityName
      state.defaultCityInfo.value = cityId
    },
    GET_RES(state, payload) {
      state.communityName = payload.communityName
      state.community = payload.community
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    REMOVE_TOKEN(state) {
      state.token = ''
    }
  }
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
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['LocationAbout']
})
export default new Vuex.Store({
  modules: {
    LocationAbout,
    PublishAbout
  },
  plugins: [vuexLocal.plugin]
})
