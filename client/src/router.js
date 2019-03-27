import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Mission from './views/Mission.vue'
import Events from './views/Events.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'

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
      component: Mission
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
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
    }
  ]
})
