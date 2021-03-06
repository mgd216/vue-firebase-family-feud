import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import toast from '@/services/toast.service'

const DEFAULT_TITLE = 'Family Feud'

const Error = () => import('@/views/Error')
const Login = () => import('@/views/Login')

Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/#',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/error',
    name: 'Error',
    component: Error,
  },
]

const routeContext = require.context('./routes', false, /\.routes\.js$/)
routeContext.keys().forEach((filename) => {
  const rts = routeContext(filename).default
  rts.forEach((r) => routes.push(r))
})

const router = new Router({
  mode: 'history',
  routes: routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next('/login')
  } else if (to.meta.requiresAdmin && !store.getters.isAdmin) {
    toast.error('You are not authorized to that route.')
    next('/home')
  } else {
    next()
  }
})

router.afterEach((to) => {
  store.dispatch('setAppTitle', to.meta.appTitle || DEFAULT_TITLE)
})

export default router
