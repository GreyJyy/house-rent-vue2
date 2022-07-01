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
    //当前选中城市的信息
    defaultCityInfo: {
      //名称
      label: '北京',
      //全拼
      pinyin: 'beijing',
      //短拼
      short: 'bj',
      //城市id
      value: 'AREA|88cff55c-aaa4-e2e0'
    },
    //选中小区名
    communityName: '请输入小区名',
    //区域id
    community: ''
  },
  mutations: {
    //修改当前选中城市名称与城市id
    CHANGE_CITY(state, { cityName, cityId }) {
      state.defaultCityInfo.label = cityName
      state.defaultCityInfo.value = cityId
    },
    //获取要搜索的小区的名称与区域id
    GET_RES(state, payload) {
      state.communityName = payload.communityName
      state.community = payload.community
    },
    //设置token
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    //清除token
    REMOVE_TOKEN(state) {
      state.token = ''
    }
  }
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['LocationAbout']
})
export default new Vuex.Store({
  modules: {
    LocationAbout
  },
  plugins: [vuexLocal.plugin]
})
