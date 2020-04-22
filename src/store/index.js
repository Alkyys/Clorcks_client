import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import * as modules from '@/store/modules'

Vue.use(Vuex)

const persist = new VuexPersist({
  storage: window.localStorage,
  reducer: state => ({
    auth: state.auth
  })
})

export default new Vuex.Store({
  modules,
  state: {
    // CONTENT
    // items: [],
    // myitems: [],
    // workspaces: [{ name: 'main' }],
    activeFullscreenItem: null,
    // modalConnection_signup: null,

    // MODALS
    // TODO: renommer les variables boolen en has... is...
    modalSetting: false,
    modalWorkspace: false,
    modalCreationWorkspace: false,
    modalCreationColor: false,
    modalCreationPalette: false,
    modalCreationGradient: false,
    modalUserSettings: false,
    isFullscreenOpened: false,
    modalChooseCreation: false,
    error: false
  },

  mutations: {

    // Fetch Content
    // SET_CONTENT (state, items) {
    //   state.items = items
    // },
    // SET_MY_WORKSPACE (state, workspace) {
    //   state.workspaces = workspace
    // },
    // SET_MY_ITEMS (state, items) {
    //   state.myitems = items
    // },

    // Modals
    SET_CHOOSECRATION (state, modalChooseCreation) {
      state.modalChooseCreation = modalChooseCreation
    },
    SET_IS_FULLSCREEN_OPENED (state, isOpened) {
      state.isFullscreenOpened = isOpened
    },
    SET_WORKSPACE (state, modal) {
      state.modalWorkspace = modal
    },
    SET_MODAL_CREATION_COLOR (state, modal) {
      state.modalCreationColor = modal
    },
    SET_MODAL_CREATION_PALETTE (state, modal) {
      state.modalCreationPalette = modal
    },
    SET_MODAL_CREATION_GRADIENT (state, modal) {
      state.modalCreationGradient = modal
    },
    SET_MODAL_CREATION_WORKSPACE (state, modal) {
      state.modalCreationWorkspace = modal
    },
    SET_MODAL_USER_SETTINGS (state, modal) {
      state.modalUserSettings = modal
    },

    // SET INFORMATION
    SET_ERROR (state, error) {
      state.error = error
    },
    SET_ACTIVE_FULLSCREEN_ITEM (state, item) {
      state.activeFullscreenItem = item
    }
    // SET_SIGN_IN_ACTION (state, action) {
    //   state.modalConnection_signup = action
    // }
  },
  actions: {
    // Modals
    toogleModalChooseCreation ({ commit }) {
      const modalChooseCreation = !this.state.modalChooseCreation
      commit('SET_CHOOSECRATION', modalChooseCreation)
    },

    // TODO: mettre en toggle
    openFullscreen ({ commit }, item) {
      commit('SET_ACTIVE_FULLSCREEN_ITEM', item)
      commit('SET_IS_FULLSCREEN_OPENED', true)
    },
    closeFullscreen ({ commit }) {
      commit('SET_IS_FULLSCREEN_OPENED', false)
      commit('SET_ACTIVE_FULLSCREEN_ITEM', null)
    },
    toogle_modal_workspace ({ commit }) {
      const modalWorkspace = !this.state.modalWorkspace
      commit('SET_WORKSPACE', modalWorkspace)
    },
    toogle_error ({ commit }) {
      const error = !this.state.error
      commit('SET_ERROR', error)
    },
    toogleModalCreationColor ({ commit }) {
      const modalCreationColor = !this.state.modalCreationColor
      commit('SET_MODAL_CREATION_COLOR', modalCreationColor)
    },
    toogleModalCreationPalette ({ commit }) {
      const modalCreationPalette = !this.state.modalCreationPalette
      commit('SET_MODAL_CREATION_PALETTE', modalCreationPalette)
    },
    toogleModalCreationGradient ({ commit }) {
      const modalCreationGradient = !this.state.modalCreationGradient
      commit('SET_MODAL_CREATION_GRADIENT', modalCreationGradient)
    },
    toogleModalCreationWorkspace ({ commit }) {
      const modalCreationWorspace = !this.state.modalCreationWorkspace
      commit('SET_MODAL_CREATION_WORKSPACE', modalCreationWorspace)
    },
    toogleModalUserSettings ({ commit }) {
      const modalUerSettings = !this.state.modalUserSettings
      commit('SET_MODAL_USER_SETTINGS', modalUerSettings)
    }

    // chooseConnection ({ commit }, action) {
    //   commit('SET_SIGN_IN_ACTION', action)
    // }
  },
  plugins: [persist.plugin]
})
