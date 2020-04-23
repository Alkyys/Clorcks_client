import axios from '@/axios'

export const state = {

}

export const mutations = {

}

export const actions = {
  async create ({ dispatch, rootState, rootGetters }, [[{ r1, g1, b1 }, { r2, g2, b2 }], label]) {
    try {
      const result = await axios.post('/gradient', {
        user_id: rootState.auth.user_id,
        stops: [
          {
            color: {
              red: r1,
              green: g1,
              blue: b1
            },
            position: 0
          },
          {
            color: {
              red: r2,
              green: g2,
              blue: b2
            },
            position: 100
          }
        ],
        label: label,
        workspace_id: rootGetters['workspacejam/active']._id
      })
      console.log('✅ create Gradient ->', result)
      return result
    } catch (error) {
      console.log('⛔ create Gradient -> error', error)
      dispatch(`toogle_error`, null, { root: true })
    }
  },
  async delete ({ dispatch }, { gradientId }) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`gradient/${gradientId}`)
        .then((response) => {
          alert(`on a supprime le degrader ${gradientId}`)
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
