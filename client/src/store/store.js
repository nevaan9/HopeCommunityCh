import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import home from './modules/home'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    home
  },
  state: {
    notification: false,
    snackbar: {
      y: 'top',
      x: 'right',
      mode: '',
      timeout: 6000,
      text: ''
    }
  },
  mutations: {
    showNotification(state, newSnackbar) {
      state.notification = true
      state.snackbar = { ...state.snackbar, ...newSnackbar }
    },
    updateNotification(state, value) {
      state.notification = value
    }
  },
  actions: {}
})
