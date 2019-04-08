import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'

export default {
  namespaced: true,
  state: {
    user: null,
    token: VueCookies.get('x-auth') || null,
    loading: false,
    error: false,
    isAuth: false
  },
  getters: {
    isAuth(state) {
      return !!state.token
    },
    currentUser(state) {
      return !!state.user
    }
  },
  actions: {
    login({ commit }, { url, body }) {
      commit('USER_LOGIN_REQUEST')
      return axios
        .post(url, body)
        .then(response => {
          // Get the token
          const token = response.headers['x-auth']
          // Set the token in a cookie
          VueCookies.set('x-auth', token, '1h')
          axios.defaults.headers.common['x-auth'] = token
          const user = response.data
          commit('USER_LOGIN_SUCCESS', { user, token })
          return response
        })
        .catch(error => {
          commit('USER_LOGIN_FAILURE', error.response)
          throw error
        })
    },
    logout({ commit }) {
      return new Promise(resolve => {
        // axios.post('/logout')
        axios.delete('/user/logout').finally(() => {
          commit('USER_LOGOUT')
          VueCookies.remove('x-auth') // clear your user's token from cookie
          delete axios.defaults.headers.common['x-auth']
          resolve()
        })
      })
    }
  },
  mutations: {
    USER_LOGIN_REQUEST(state) {
      Vue.set(state, 'loading', true)
    },
    USER_LOGIN_SUCCESS(state, { user, token }) {
      Vue.set(state, 'loading', false)
      Vue.set(state, 'error', false)
      Vue.set(state, 'isAuth', true)
      state.user = Object.assign({}, user)
      state.token = token
    },
    USER_LOGIN_FAILURE(state, error) {
      Vue.set(state, 'loading', false)
      Vue.set(state, 'error', error)
    },
    USER_LOGOUT(state) {
      Vue.set(state, 'loading', false)
      Vue.set(state, 'error', false)
      Vue.set(state, 'isAuth', false)
      state.user = Object.assign({})
      state.token = null
    },
    SET_AUTH_STATUS(state, status) {
      Vue.set(state, 'isAuth', status)
    }
  }
}
