import axios from '@/axios'

export const state = {

}

export const mutations = {

}

export const actions = {
  async create ({ dispatch, rootState, rootGetters }, { colors, label }) {
    try {
      const result = await axios.post('/palette', {
        user_id: rootState.auth.user.user_id,
        colors_id: colors,
        label: label,
        workspace_id: rootGetters['workspacejam/active']._id
      })
      console.log('✅ create Palette ->', result)
      return result
    } catch (error) {
      console.log('⛔ create Palette -> error', error)
      dispatch(`toogle_error`, null, { root: true })
    }
  },
  async delete ({ dispatch }, { paletteId }) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`palette/${paletteId}`)
        .then((response) => {
          alert(`on a supprime la palette ${paletteId}`)
          resolve(response)
        }).catch((err) => {
          alert(`erreur : ${err}`)
          console.log('🐛: delete -> error', err)
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions
}
