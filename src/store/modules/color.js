import axios from '@/axios'

export const state = {

}

export const mutations = {

}

export const actions = {
  async create ({ dispatch, rootGetters }, { r, g, b }) {
    try {
      const result = await axios.post('/color', {
        red: r,
        green: g,
        blue: b,
        alpha: 1.0,
        name: ''
      })
      const workspaceId = rootGetters['workspacejam/active']._id
      const data = await axios.put(
        `/workspace/${workspaceId}`,
        { _id: result.data.result._id }
      )
      console.log('✅ postColor ->', data)
      dispatch(`toogleModalCreationColor`, null, { root: true })
      return
    } catch (error) {
      console.log('⛔ postColor -> error', error)
      dispatch(`toogle_error`, null, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  actions
}
