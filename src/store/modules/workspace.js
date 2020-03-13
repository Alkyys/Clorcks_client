import axios from '@/axios'

export const state = {
  items: [],
  myitems: [],
  workspaces: [{ name: 'main' }]
}

export const mutations = {
  SET_CONTENT (state, items) {
    state.items = items
  },
  SET_MY_WORKSPACE (state, workspace) {
    state.workspaces = workspace
  },
  SET_MY_ITEMS (state, items) {
    state.myitems = items
  }
}

export const actions = {
  // permet de recuperer tout mes workspaces
  async loadMyWokspaces ({ commit, dispatch }, id) {
    try {
      const result = await axios.get(`/workspace/my/${id}`)
      console.log('🐛: loadMyWokspaces -> result', result)
      commit('SET_MY_WORKSPACE', result.data)
      dispatch(`loadMyWokspace`)
    } catch (error) {
      console.log('⛔: loadMyWokspaces -> error', error)
    }
  },
  // permet de charger les items de mon workspace
  async loadMyWokspace ({ commit }) {
    let gradients = []
    let palettes = []
    const workspace = await this.state.workspaces.find(workspace => workspace.name === 'main')
    console.log('🐛: loadMyWokspace -> workspacemain', workspace)
    if (workspace) {
      try {
        let result = await axios.get(`/palette/my/${workspace._id}`)
        palettes = result.data
        result = await axios.get(`/gradient/my/${workspace._id}`)
        gradients = result.data
      } catch (error) {
        console.log('⛔: loadMyWokspace -> error', error)
      }
    }
    commit('SET_MY_ITEMS', [].concat(workspace.colors_id, palettes, gradients))
  },

  // Load contents
  async loadContent ({ commit }) {
    try {
      const { data: colors } = await axios.get('/color')
      const { data: gradients } = await axios.get('/gradient')
      const { data: palettes } = await axios.get('/palette')

      commit('SET_CONTENT', [].concat(colors, gradients, palettes))
    } catch (error) {
      console.log('⛔: loadContent -> error', error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
