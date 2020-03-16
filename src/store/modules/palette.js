import axios from '@/axios'

export const state = {

}

export const mutations = {

}

export const actions = {
  async create ({ dispatch, rootState, rootGetters }, { colors, label }) {
    console.log('🐛: create -> { colors, label }', { colors, label })
    console.log('🐛: create -> rootState.auth.user_id', rootState.auth.user.user_id)
    try {
      const result = await axios.post('/palette', {
        user_id: rootState.auth.user.user_id,
        colors_id: colors,
        label: label,
        workspace_id: rootGetters['workspacejam/active']._id
      })
      console.log('✅ create Palette ->', result)
      dispatch(`toogleModalCreationPalette`, null, { root: true })
      return
    } catch (error) {
      console.log('⛔ create Palette -> error', error)
      dispatch(`toogle_error`, null, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  actions
}
