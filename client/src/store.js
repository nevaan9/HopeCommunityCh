import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notification: false,
    snackbar: {
      y: 'top',
      x: 'right',
      mode: '',
      timeout: 6000,
      text: "Hello, I'm a snackbar"
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
