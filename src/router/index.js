import Vue from 'vue'
import VueRouter from 'vue-router'
import Measurement from '../components/Measurement.vue'
import Navbar from '../components/Navbar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/measurement'
  },
  {
    path: '/measurement',
    name: 'measurement',
    components: {
      default: Measurement,
      navbar: Navbar
    }
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      default: () => import('../components/Admin.vue'),
      navbar: Navbar
    }
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
