import Vue from 'vue'
import Router from 'vue-router'
import Hompage from '@/components/Hompage'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hompage',
      component: Hompage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
