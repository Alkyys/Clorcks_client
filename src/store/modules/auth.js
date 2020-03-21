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
  SET_USER (state, payload) {
    state.user = payload
  }
}

export const actions = {
  authenticate ({ commit }, { accessToken }) {
    const user = JSON.parse(atob(accessToken.split(`.`)[1]))
    setAuthorizationHeader(accessToken)
    commit('SET_ACCESS_TOKEN', accessToken)
    commit('SET_USER', user)
    router.push({ name: 'home' })
  },

  async login ({ dispatch }, payload) {
    try {
      const { data } = await axios.post(`/user/login`, payload)
      console.log('🐛: login -> data', data)
      dispatch('authenticate', data)
    } catch (error) {
      // TODO: gerer les erreur de login
      console.log('🐛: login -> error', error)
    }
  },

  async signUp ({ dispatch }, payload) {
    const { password1, password2 } = payload
    if (password1 === password2) {
      try {
        const { data } = await axios.post('/user/signup', {
          name: payload.name,
          email: payload.email,
          password: password1
        })
        dispatch('authenticate', data)
      } catch (error) {
        dispatch('toogle_error', null, { root: true })
      }
    } else {
      // TODO: gerer les erreur de signup
      console.log('ton password = bite !')
    }
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
