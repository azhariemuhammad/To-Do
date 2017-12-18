import Vue from 'vue'
import Router from 'vue-router'
import Hompage from '@/components/Hompage'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hompage',
      component: Hompage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = localStorage.getItem('userId')
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('/login')
  else if (!requiresAuth && currentUser) next('/')
  else next()
})

export default router
