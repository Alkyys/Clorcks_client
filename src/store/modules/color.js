import axios from '@/axios'

export const state = {

}

export const mutations = {

}

export const actions = {
  async create ({ dispatch, rootState }, { r, g, b }) {
    try {
      const result = await axios.post('/color', {
        red: r,
        green: g,
        blue: b,
        alpha: 1.0,
        name: ''
      })
      const data = await axios.put(
        `/workspace/${rootState.workspaces[0]._id}`,
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
