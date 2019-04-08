import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import _ from 'lodash'
import VueCookies from 'vue-cookies'

// Auth checkers
const isAuthenticated = (to, from, next) => {
  const authenticated = store.getters['auth/isAuth'] || false
  const user = store.getters['auth/currentUser'] || false
  store.commit('auth/SET_AUTH_STATUS', authenticated)
  // This means the store does not have the user object
  if (authenticated && !user) {
    axios
      .get('/user/me')
      .then(res => {
        const user = _.pick(res.data, ['_id', 'name', 'email', 'isAdmin'])
        store.commit('auth/USER_LOGIN_SUCCESS', { user, token: authenticated })
        next()
      })
      .catch(() => {
        // Do somrhing here
        store.dispatch('auth/logout').then(() => {
          next()
        })
      })
  } else {
    next()
  }
}

router.beforeEach(isAuthenticated)

// Middlewear
Vue.use(VueCookies)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// Set the auth header if the user is authenticated
const token = VueCookies.get('x-auth')
if (token) {
  axios.defaults.headers.common['x-auth'] = token
}

new Vue({
  router,
  store,
  $axios: axios,
  render: h => h(App)
}).$mount('#app')
