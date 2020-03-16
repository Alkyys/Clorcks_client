import axios from '@/axios'

export const state = {
  all: [],
  activeWorkspaceName: 'main',
  colors: [],
  gradients: [],
  palettes: []
}

export const getters = {
  active (state) {
    return state.all.find(w => w.name === state.activeWorkspaceName)
  },

  items (state) {
    return [].concat(
      state.colors,
      state.gradients,
      state.palettes)
  }
}

export const mutations = {
  SET_ALL (state, payload) {
    state.all = payload
  },
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
  async list ({ commit }) {
    try {
      const { status, data } = await axios.get('/workspace')
      if (status === 200) {
        commit('SET_ALL', data)
      }
    } catch (error) {
      console.log('☝: list -> error', error)
    }
  },

  async loadItems ({ commit, getters }) {
    try {
      const workspaceId = getters.active._id
      const [ gradients, palettes ] = await Promise.all([
        axios.get(`/workspace/${workspaceId}/gradient`),
        axios.get(`/workspace/${workspaceId}/palette`)
      ])
      commit('SET_COLORS', getters.active.colors_id)
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
