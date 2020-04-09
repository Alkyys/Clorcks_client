import axios, { setAuthorizationHeader } from '@/axios'
import router from '@/router'

export const state = {
  accessToken: '',
  refrehToken: '',
  user: {}
}

export const getters = {
  /** @returns {Boolean} */
  isAuthenticated: state => {
    return !!state.accessToken
  }
}

export const mutations = {
  SET_ACCESS_TOKEN (state, payload) {
    state.accessToken = payload
  },
  SET_REFRESH_TOKEN (state, payload) {
    state.refrehToken = payload
  },
  SET_USER (state, payload) {
    state.user = payload
  }
}

export const actions = {
  authenticate ({ commit }, { accessToken, refrehToken }) {
    const user = JSON.parse(atob(accessToken.split(`.`)[1]))
    setAuthorizationHeader(accessToken)
    commit('SET_ACCESS_TOKEN', accessToken)
    commit('SET_REFRESH_TOKEN', refrehToken)
    commit('SET_USER', user)
    router.push({ name: 'home' })
  },

  async login ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/user/login`, payload)
        .then((response) => {
          resolve(response)
          dispatch('authenticate', response.data)
        })
        .catch((error) => {
          reject(error.response.data)
        })
    })
  },

  async signUp ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/user/signup', {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error.response)
        })
    })
    //     dispatch('toogle_error', null, { root: true })
  },

  async disconnect ({ commit }) {
    setAuthorizationHeader()
    commit('SET_MY_WORKSPACE', [{ name: 'main' }], { root: true })
    commit('SET_MY_ITEMS', [], { root: true })
    commit('SET_USER', {})
    commit('SET_ACCESS_TOKEN', '')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
