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
    console.log(`🍕 ${state.colors.push()}`)
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
  ADD_COLOR (state, payload) {
    state.colors.push(payload)
  },
  DELETE_COLOR (state, item) {
    state.colors.splice(state.colors.indexOf(item), 1)
  },

  SET_GRADIENTS (state, payload) {
    state.gradients = payload
  },
  ADD_GRADIENT (state, payload) {
    state.gradients.push(payload)
  },
  DELETE_GRADIENT (state, item) {
    state.gradients.splice(state.gradients.indexOf(item), 1)
  },

  SET_PALETTES (state, payload) {
    state.palettes = payload
  },
  ADD_PALETTE (state, payload) {
    state.palettes.push(payload)
  },
  DELETE_PALETTE (state, id) {
    state.palettes.splice(state.palettes.indexOf(id), 1)
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
      const [colors, gradients, palettes] = await Promise.all([
        axios.get(`/workspace/${workspaceId}/color`),
        axios.get(`/workspace/${workspaceId}/gradient`),
        axios.get(`/workspace/${workspaceId}/palette`)
      ])
      console.log('🐛: loadItems -> colors.data', colors.data)
      commit('SET_COLORS', colors.data)
      commit('SET_GRADIENTS', gradients.data)
      commit('SET_PALETTES', palettes.data)
    } catch (error) {
      console.log('🐛: load -> error', error)
    }
  },

  async addItem ({ dispatch, commit }, { payload, type }) {
    try {
      if (type === 'color') {
        // on enregistre la couleur dans la base de donnees
        const result = await dispatch('color/create', payload, { root: true })
        // on rajoute la creation au front-end
        commit('ADD_COLOR', result.data.color)
        // on ferme la modal
        dispatch(`toogleModalCreationColor`, null, { root: true })
      } else if (type === 'gradient') {
        const result = await dispatch('gradient/create', payload, { root: true })
        commit('ADD_GRADIENT', result.data.result)
        dispatch(`toogleModalCreationGradient`, null, { root: true })
      } else if (type === 'palette') {
        const result = await dispatch('palette/create', payload, { root: true })
        commit('ADD_PALETTE', result.data.result)
        dispatch(`toogleModalCreationPalette`, null, { root: true })
      } else {
        console.log('🐛: addItem -> type', type)
        dispatch('toogle_error', null, { root: true })
      }
    } catch (error) {
      console.log('🐛: addItem -> error', error)
      dispatch('toogle_error', null, { root: true })
    }
  },

  async deleteItem ({ dispatch, commit }, { item, type }) {
    try {
      if (type === 'color') {
        await dispatch('color/delete', { colorId: item._id }, { root: true })
        commit('DELETE_COLOR', item)
      } else if (type === 'gradient') {
        await dispatch('gradient/delete', { gradientId: item._id }, { root: true })
        commit('DELETE_GRADIENT', item)
      } else if (type === 'palette') {
        await dispatch('palette/delete', { paletteId: item._id }, { root: true })
        commit('DELETE_PALETTE', item)
      } else {
        dispatch('toogle_error', null, { root: true })
      }
    } catch (error) {
      console.log('🐛: deleteItem -> error', error)
      dispatch('toogle_error', null, { root: true })
    }
  },

  async like ({ dispatch, rootGetters }, { item, type }) {
    if (rootGetters['auth/isAuthenticated']) {
      const workspaceId = rootGetters['workspacejam/active']._id
      try {
        console.log('🐛: req like', `/workspace/${workspaceId}/${type}/${item._id}/like`)
        const result = await axios.patch(`/workspace/${workspaceId}/${type}/${item._id}/like`,
          {
            item
          })
        return result
      } catch (error) {
        console.log('🐛: deleteItem -> error', error)
        dispatch('toogle_error', null, { root: true })
      }
    } else {
      dispatch('toogle_error', null, { root: true })
    }
    // if (rootGetters['auth/isAuthenticated']) {
    //   return new Promise((resolve, reject) => {
    //     console.log('🐛: like -> item', item)
    //     try {
    //       const workspaceId = rootGetters['workspacejam/active']._id
    //       const result = axios.put(`/workspace/${workspaceId}/like`,
    //         {
    //           item
    //         })
    //       // return true ou false
    //       resolve(result)
    //     } catch (error) {
    //       console.log('🐛: like -> error', error)
    //       reject(error)
    //       dispatch('toogle_error', null, { root: true })
    //     }
    //   })
    // }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
