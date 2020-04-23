import axios, { setAuthorizationHeader } from '@/axios'
import router from '@/router'

export const state = {
  accessToken: '',
  refreshToken: '',
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
    state.refreshToken = payload
  },
  SET_USER (state, payload) {
    state.user = payload
  }
}

export const actions = {
  authenticate ({ commit }, { accessToken, refreshToken }) {
    const user = JSON.parse(atob(accessToken.split(`.`)[1]))
    setAuthorizationHeader(accessToken)
    commit('SET_ACCESS_TOKEN', accessToken)
    commit('SET_REFRESH_TOKEN', refreshToken)
    commit('SET_USER', user)
    router.push({ name: 'home' })
  },

  async login ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/user/login`, payload)
        .then((response) => {
          dispatch('authenticate', response.data)
          console.log(`✅ login`)
          resolve(response)
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

  async refresh ({ commit, state }) {
    console.log(`🔁 refresh`)
    console.log('🐛: refresh -> state.refreshToken', state.refreshToken)
    const { data, status } = await axios.post('/user/token', {
      refreshToken: state.refreshToken
    })
    if (status === 200) {
      const { accessToken, refreshToken } = data
      commit('SET_ACCESS_TOKEN', accessToken)
      commit('SET_REFRESH_TOKEN', refreshToken)
      setAuthorizationHeader(accessToken)
      return accessToken
    }
  },

  async disconnect ({ commit }) {
    console.log(`🔚 disconnect`)
    setAuthorizationHeader()
    commit('workspacejam/SET_ALL', [], { root: true })
    commit('workspacejam/SET_COLORS', [], { root: true })
    commit('workspacejam/SET_GRADIENTS', [], { root: true })
    commit('workspacejam/SET_PALETTES', [], { root: true })
    commit('SET_USER', {})
    commit('SET_ACCESS_TOKEN', '')
    commit('SET_REFRESH_TOKEN', '')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
