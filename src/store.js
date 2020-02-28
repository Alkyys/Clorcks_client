import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: null,
      name: null,
      email: null,
      user_id: null,
      iat: null,
      exp: null
    },

    // CONTENT
    items: [],
    myitems: [],
    colors: [],
    palettes: [],
    gradients: [],
    workspaces: [],
    activeFullscreenItem: null,
    modalConnection_signup: null,

    // MODALS
    // TODO: renommer les variables boolen en has... is...
    modalConnection: false,
    modalSetting: false,
    modalWorkspace: false,
    modalCreationWorkspace: false,
    modalCreationColor: false,
    modalCreationPalette: false,
    modalCreationGradient: false,
    isFullscreenOpened: false,
    modalChooseCreation: false,

    // INFO
    connected: false,
    option: false

  },
  mutations: {

    // Fetch Content
    SET_CONTENT (state, items) {
      state.items = items
    },
    SET_COLORS (state, colors) {
      state.colors = colors
    },
    SET_GRADIENT (state, gradients) {
      state.gradients = gradients
    },
    SET_PALETTE (state, palettes) {
      state.palettes = palettes
    },
    SET_MY_WORKSPACE (state, myitems) {
      state.myitems = myitems
    },

    // Modals
    SET_MODAL (state, modalConnection) {
      state.modalConnection = modalConnection
    },
    SET_CONNECTED (state, connected, modalConnection) {
      state.connected = connected
      state.modalConnection = modalConnection
    },
    SET_TOKEN (state, token) {
      if (state.connected === true) {
        const user = JSON.parse(atob(token.split(`.`)[1]))
        console.log('TCL: SET_TOKEN -> user', user)
        state.user.token = token
        state.user.name = user.name
        state.user.email = user.email
        state.user.user_id = user.user_id
        state.user.iat = user.iat
        state.user.exp = user.exp
      } else {
        state.user.token = null
        state.user.name = null
        state.user.email = null
        state.user.user_id = null
        state.user.iat = null
        state.user.exp = null
      }
    },
    SET_CHOOSECRATION (state, modalChooseCreation) {
      state.modalChooseCreation = modalChooseCreation
    },
    SET_IS_FULLSCREEN_OPENED (state, isOpened) {
      state.isFullscreenOpened = isOpened
    },
    SET_CREATIONCOLOR (state, modalCreationColor) {
      state.modalCreationColor = modalCreationColor
    },

    // SET INFORMATION
    SET_ACTIVE_FULLSCREEN_ITEM (state, item) {
      state.activeFullscreenItem = item
    },
    SET_SIGN_IN_ACTION (state, action) {
      state.modalConnection_signup = action
    }
  },
  actions: {

    // Load contents
    async loadContent ({ commit }) {
      try {
        const { data: colors } = await axios.get('https://clorcks.herokuapp.com/color')
        const { data: gradients } = await axios.get('https://clorcks.herokuapp.com/gradient')
        const { data: palettes } = await axios.get('https://clorcks.herokuapp.com/palette')

        commit('SET_CONTENT', [].concat(colors, gradients, palettes))
      } catch (error) {
        console.log('TCL: loadContent -> error', error)
      }
    },

    loadColors ({ commit }) {
      axios
        .get('https://clorcks.herokuapp.com/color')
        .then((result) => {
          console.log(result)
          const colors = result.data
          commit('SET_COLORS', colors)
        }).catch((err) => {
          console.log(err)
        })
    },
    loadGradients ({ commit }) {
      axios
        .get('https://clorcks.herokuapp.com/gradient')
        .then((result) => {
          console.log(result)
          const gradients = result.data
          commit('SET_GRADIENT', gradients)
        }).catch((err) => {
          console.log(err)
        })
    },
    loadPalettes ({ commit }) {
      axios
        .get('https://clorcks.herokuapp.com/palette')
        .then((result) => {
          console.log(result)
          const palettes = result.data
          commit('SET_PALETTE', palettes)
        }).catch((err) => {
          console.log(err)
        })
    },
    loadMyWokspace ({ commit }, id) {
      console.log('TCL: loadMyWokspace -> id', id)
      axios
        .get(`http://localhost:3000/workspace/my/${id}`)
        .then((result) => {
          console.log('TCL: loadMyWokspace -> result', result)
          const workspaces = result.data
          commit('SET_MY_WORKSPACE', workspaces)
        }).catch((err) => {
          console.log(err)
        })
    },

    // Modals
    openModal_connection ({ commit }, action) {
      let modalConnection = !this.state.modalConnection
      commit('SET_SIGN_IN_ACTION', action)
      commit('SET_MODAL', modalConnection)
    },
    openModal_choose_creation ({ commit }) {
      let modalChooseCreation = !this.state.modalChooseCreation
      commit('SET_CHOOSECRATION', modalChooseCreation)
    },
    openModal_creation ({ commit }) {
      let modalChooseCreation = false
      commit('SET_CHOOSECRATION', modalChooseCreation)
      let modalCreationColor = !this.state.modalCreationColor
      commit('SET_CREATIONCOLOR', modalCreationColor)
    },
    openFullscreen ({ commit }, item) {
      commit('SET_ACTIVE_FULLSCREEN_ITEM', item)
      commit('SET_IS_FULLSCREEN_OPENED', true)
    },
    closeFullscreen ({ commit }) {
      commit('SET_IS_FULLSCREEN_OPENED', false)
      commit('SET_ACTIVE_FULLSCREEN_ITEM', null)
    },

    // Options
    connection ({ commit }, token) {
      let modalConnection = !this.state.modalConnection
      let connected = !this.state.connected
      commit('SET_CONNECTED', connected, modalConnection)
      commit('SET_TOKEN', token)
    },
    chooseConnection ({ commit }, action) {
      commit('SET_SIGN_IN_ACTION', action)
    }
  },
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(todo => todo.done)
    // }
  }
})
