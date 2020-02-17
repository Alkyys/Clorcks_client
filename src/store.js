import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},

    // CONTENT
    colors: [],
    palettes: [],
    gradients: [],
    workspaces: [],

    // MODALS
    modalConnection: false,
    modalSetting: false,
    modalWorkspace: false,
    modalCreationWorkspace: false,
    modalCreationColor: false,
    modalCreationPalette: false,
    modalCreationGradient: false,
    modalFullscreen: false,

    // INFO
    connected: false,
    option: false

  },
  mutations: {

    // Content
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

    // Modal
    SET_MODAL (state, modalC) {
      state.modalC = modalC
    }
  },
  actions: {

    // Load content
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
    openModal_c ({ commit }) {
      let modalC = !this.state.modalC
      commit('SET_MODAL', modalC)
    }
  },
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(todo => todo.done)
    // }
  }
})
