export const state = {
  accessToken: '',
  refrehToken: '',
  user: {
    // token: null,
    // name: null,
    // email: null,
    // user_id: null,
    // iat: null,
    // exp: null
  }
}

export const getters = {
  /** @returns {Boolean} */
  isAuthenticated: state => {
    return !!state.accessToken
  }
}

export const mutations = {
  SET_ACCESS_TOKEN (state, token) {
    const user = JSON.parse(atob(token.split(`.`)[1]))
    state.user = user
    state.accessToken = token
  }
}

export const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
