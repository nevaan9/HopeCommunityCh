import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Mission from './views/Mission.vue'
import Events from './views/Events.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import ComingSoon from './views/ComingSoon.vue'
import Giving from './views/Giving.vue'
import Reset from './views/Reset.vue'
import ResetToken from './views/ResetToken.vue'
import store from './store/store'
import axios from 'axios'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/mission',
      name: 'mission',
      component: Mission,
      redirect: { name: 'coming-soon' }
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      redirect: { name: 'coming-soon' }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      redirect: { name: 'coming-soon' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      redirect: { name: 'coming-soon' }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/coming-soon',
      name: 'coming-soon',
      component: ComingSoon,
      props: {
        top: 'This is not ready yet',
        center: 'Sorry',
        bottom: 'Coming Soon!'
      }
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset,
      props: true
    },
    {
      path: '/reset/:token',
      name: '/reset/:token',
      component: ResetToken,
      props: true,
      beforeEnter: (to, from, next) => {
        const token = to.params.token
        if (!token) {
          next({
            name: 'reset',
            params: {
              emitAlert: 'No valid token; Request a new one here'
            }
          })
        }
        axios
          .get(`/user/reset-password/${token}`)
          .then(response => {
            debugger
            const { email, token } = response.data
            to.params.email = email
            to.params.token = token
            next()
          })
          .catch(() => {
            next({
              name: 'reset',
              params: {
                emitAlert:
                  'Something went wrong or token was expired; Request a new one here'
              }
            })
          })
      }
    },
    {
      path: '/giving',
      name: 'giving',
      beforeEnter: (to, from, next) => {
        const authenticated = store.getters['auth/isAuth'] || false
        if (authenticated) {
          next()
        } else {
          next({
            name: 'login',
            params: {
              emitLogInAlert: true,
              redirectPage: { name: 'giving' }
            }
          })
        }
      },
      component: Giving
    },
    {
      path: '*',
      component: ComingSoon,
      props: {
        top: 'Oops! Page not found',
        center: '404',
        bottom: 'We are sorry, but the page you requested was not found'
      }
    }
  ]
})
