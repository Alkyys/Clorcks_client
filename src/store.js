import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},

    // CONTENT
    items: [],
    colors: [],
    palettes: [],
    gradients: [],
    workspaces: [],
    activeFullscreenItem: null,

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
    SET_WORKSPACE (state, workspaces) {
      state.workspaces = workspaces
    },

    // Modals
    SET_MODAL (state, modalConnection) {
      state.modalConnection = modalConnection
    },
    SET_CONNECTED (state, connected, modalConnection) {
      state.connected = connected
      state.modalConnection = modalConnection
    },
    SET_CHOOSECRATION (state, modalChooseCreation) {
      state.modalChooseCreation = modalChooseCreation
    },
    SET_IS_FULLSCREEN_OPENED (state, isOpened) {
      state.isFullscreenOpened = isOpened
    },
    SET_ACTIVE_FULLSCREEN_ITEM (state, item) {
      state.activeFullscreenItem = item
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
    loadWokspace ({ commit }) {
      axios
        .get('https://clorcks.herokuapp.com/workspace')
        .then((result) => {
          console.log(result)
          const workspaces = result.data
          commit('SET_WORKSPACE', workspaces)
        }).catch((err) => {
          console.log(err)
        })
    },

    // Modals
    openModal_connection ({ commit }) {
      let modalConnection = !this.state.modalConnection
      commit('SET_MODAL', modalConnection)
    },
    openModal_creation ({ commit }) {
      let modalChooseCreation = !this.state.modalChooseCreation
      commit('SET_CHOOSECRATION', modalChooseCreation)
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
    connection ({ commit }) {
      let modalConnection = !this.state.modalConnection
      let connected = !this.state.connected
      commit('SET_CONNECTED', connected, modalConnection)
    }
  },
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(todo => todo.done)
    // }
  }
})
