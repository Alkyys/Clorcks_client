import axios from '@/axios'

export const state = {
  colors: [],
  gradients: [],
  palettes: []
}

export const getters = {
  all (state) {
    return [].concat(
      state.colors,
      state.gradients,
      state.palettes)
  }
}

export const mutations = {
  SET_COLORS (state, payload) {
    state.colors = payload
  },
  SET_GRADIENTS (state, payload) {
    state.gradients = payload
  },
  SET_PALETTES (state, payload) {
    state.palettes = payload
  }
}

export const actions = {
  async load ({ commit, dispatch }) {
    try {
      const [ colors, gradients, palettes ] = await Promise.all([
        axios.get('/color'),
        axios.get('/gradient'),
        axios.get('/palette')
      ])
      commit('SET_COLORS', colors.data)
      commit('SET_GRADIENTS', gradients.data)
      commit('SET_PALETTES', palettes.data)
    } catch (error) {
      console.log('🐛: load -> error', error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
