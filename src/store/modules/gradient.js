import axios from '@/axios'

export const state = {

}

export const mutations = {

}

export const actions = {
  async create ({ dispatch, rootState }, [[{ r1, g1, b1 }, { r2, g2, b2 }], label]) {
    // dispatch(`color/create`, { r1, g1, b1 }, { root: true })
    // dispatch(`color/create`, { r2, g2, b2 }, { root: true })
    console.log('🐛: create ->', rootState.auth.user.user_id,
      [
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
      label,
      rootState.workspaces[0]._id)
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
        workspace_id: rootState.workspaces[0]._id
      })
      console.log('✅ create Gradient ->', result)
      dispatch(`toogleModalCreationGradient`, null, { root: true })
      return
    } catch (error) {
      console.log('⛔ create Gradient -> error', error)
      dispatch(`toogle_error`, null, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  actions
}
