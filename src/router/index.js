import Vue from 'vue'
import VueRouter from 'vue-router'
import Measurement from '../components/Measurement.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/measurement'
  },
  {
    path: '/measurement',
    name: 'measurement',
    component: Measurement
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Navigation Guard
// 'isAuthorized' is for testing.  Would need login functionality with storage of user, roles, etc
var isAuthorized = true;
router.beforeEach((to, from, next) => {
  if (to.name == 'admin' && !isAuthorized) next({ name: 'measurement' })
    else next()
})

export default router;
