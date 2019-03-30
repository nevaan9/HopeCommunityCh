import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  $axios: axios,
  render: h => h(App)
}).$mount('#app')
