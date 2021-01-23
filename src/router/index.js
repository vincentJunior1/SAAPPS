import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Maps from '../views/Maps.vue'
import Chat from '../views/Chat.vue'
import Register from '../views/Register.vue'
import ActivicationUser from '../views/ActivicationUser.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/maps',
    name: 'Maps',
    component: Maps,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/verification/:id',
    name: 'ActivicationUser',
    component: ActivicationUser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
