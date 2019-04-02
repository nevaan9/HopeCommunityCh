import Vue from 'vue'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    loading: null,
    error: null,
    heading: null,
    subHeading: null,
    mainButtonText: null,
    mainCoverPicture: null,
    mainCenterPicture: null,
    churchesHeader: null,
    churchesSubHeader: null,
    churchOneInfo: {
      picture: null,
      text: null,
      location: null,
      time: null,
      description: null
    },
    churchTwoInfo: {
      picture: null,
      text: null,
      location: null,
      time: null,
      description: null
    },
    secondaryCoverPicture: null,
    churchInfoSectionOne: {
      title: null,
      description: null
    },
    churchInfoSectionTwo: {
      title: null,
      description: null
    }
  },
  actions: {
    getHomeData({ commit }) {
      commit('HOME_DATA_REQUEST')
      axios
        .get('/home')
        .then(homeData => {
          commit('HOME_DATA_SUCCESS', homeData)
        })
        .catch(err => {
          commit('HOME_DATA_FAILURE', err)
        })
    }
  },
  mutations: {
    HOME_DATA_REQUEST(state) {
      Vue.set(state, 'loading', true)
    },
    HOME_DATA_SUCCESS(state, { data: homeObj }) {
      Vue.set(state, 'loading', false)
      Vue.set(state, 'error', false)
      Object.keys(homeObj).forEach(key => {
        if (
          key === 'churchOneInfo' ||
          key === 'churchTwoInfo' ||
          key === 'churchInfoSectionOne' ||
          key === 'churchInfoSectionTwo'
        ) {
          Object.keys(homeObj[key]).forEach(subKey => {
            Vue.set(state[key], [subKey], homeObj[key][subKey])
          })
        } else {
          Vue.set(state, [key], homeObj[key])
        }
      })
    },
    HOME_DATA_FAILURE(state, err) {
      Vue.set(state, 'loading', false)
      Vue.set(state, 'error', err)
    }
  }
}
