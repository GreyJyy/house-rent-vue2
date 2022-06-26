import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Field,
  Form,
  Button,
  NumberKeyboard,
  Checkbox,
  CheckboxGroup,
  Popup,
  Icon,
  Col,
  Row
} from 'vant'
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(NumberKeyboard)
Vue.use(Popup)
Vue.use(Icon)
Vue.use(Col)
Vue.use(Row)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
