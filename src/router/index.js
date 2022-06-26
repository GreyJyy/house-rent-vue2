import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', name: 'home', component: () => import('@/views/Home') },
  { path: '/login', name: 'login', component: () => import('@/views/Login') },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
  },
  { path: '/user', name: 'user', component: () => import('@/views/User') },
  { path: '/map', name: 'map', component: () => import('@/views/Map') },
  { path: '/city', name: 'city', component: () => import('@/views/City') },
  { path: '/news', name: 'news', component: () => import('@/views/News') },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register')
  }
]

const router = new VueRouter({
  routes
})

export default router
