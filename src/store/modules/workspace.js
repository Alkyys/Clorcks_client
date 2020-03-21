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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
