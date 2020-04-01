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
  deleteItem ({ dispatch }, { id, type }) {
    return new Promise((resolve, reject) => {
      if (type === 'color') {
        dispatch('color/delete', { colorId: id }, { root: true })
        resolve()
      } else if (type === 'gradient') {
        dispatch('gradient/delete', { gradientId: id }, { root: true })
        resolve()
      } else if (type === 'palette') {
        dispatch('palette/delete', { paletteId: id }, { root: true })
        resolve()
      } else {
        const error = 'commande invalide'
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
