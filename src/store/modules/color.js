import axios from '@/axios'

export const state = {

}

export const mutations = {
}

export const actions = {
  async create ({ rootGetters }, { r, g, b }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/color', {
          red: r,
          green: g,
          blue: b,
          alpha: 1.0,
          name: ''
        }).then((result) => {
          const workspaceId = rootGetters['workspacejam/active']._id
          axios.put(
            `/workspace/${workspaceId}/color`,
            { _id: result.data.color._id }
          ).then((data) => {
            console.log('✅ postColor ->', data)
            resolve(result)
          }).catch((err) => {
            console.log('🐛: create -> err', err)
            reject(err)
          })
        }).catch((err) => {
          console.log('🐛: create -> err', err)
          reject(err)
        })
    })
  },

  async delete ({ rootGetters }, { colorId }) {
    return new Promise((resolve, reject) => {
      const workspaceId = rootGetters['workspacejam/active']._id
      axios
        .delete(`workspace/${workspaceId}/color/${colorId}`)
        .then((response) => {
          alert(`on a supprime ${colorId}`)
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
