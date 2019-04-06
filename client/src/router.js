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
      component: Login
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
