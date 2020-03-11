import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from '@/router'
import * as modules from '@/store/modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {
    // CONTENT
    items: [],
    myitems: [],
    workspaces: [{ name: 'main' }],
    activeFullscreenItem: null,
    modalConnection_signup: null,

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
    SET_CONTENT (state, items) {
      state.items = items
    },
    SET_MY_WORKSPACE (state, workspace) {
      state.workspaces = workspace
    },
    SET_MY_ITEMS (state, items) {
      state.myitems = items
    },

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
    },
    SET_SIGN_IN_ACTION (state, action) {
      state.modalConnection_signup = action
    }
  },
  actions: {
    // Load contents
    async loadContent ({ commit }) {
      try {
        const { data: colors } = await axios.get('http://localhost:3000/color')
        const { data: gradients } = await axios.get('https://clorcks.herokuapp.com/gradient')
        const { data: palettes } = await axios.get('https://clorcks.herokuapp.com/palette')

        commit('SET_CONTENT', [].concat(colors, gradients, palettes))
      } catch (error) {
        console.log('TCL: loadContent -> error', error)
      }
    },

    /**
            .get(http://localhost:3000/workspace/${workspace._id}/gradient)
            .get(http://localhost:3000/workspace/${workspace._id}/color)
            .get(http://localhost:3000/workspace/${workspace._id}/palette)
            .patch(http://localhost:3000/color/${color._id})
     */
    // permet de recuperer tout mes workspaces
    loadMyWokspaces ({ commit, dispatch }, id) {
      console.log('TCL: loadMyWokspace -> id', id)
      axios
        .get(`https://clorcks.herokuapp.com/workspace/my/${id}`)
        .then((result) => {
          const workspaces = result.data
          console.log('🐛: loadMyWokspace -> workspaces', workspaces)
          commit('SET_MY_WORKSPACE', workspaces)
          dispatch(`loadMyWokspace`)
        }).catch((err) => {
          console.log(err)
        })
    },
    // permet de charger les items de mon workspace
    async loadMyWokspace ({ commit }) {
      let gradients = []
      let palettes = []
      const workspace = await this.state.workspaces.find(workspace => workspace.name === 'main')
      console.log('🐛: loadMyWokspace -> workspacemain', workspace)
      if (workspace) {
        // on cherche les couleurs
        await axios
          .get(`http://localhost:3000/palette/my/${workspace._id}`)
          .then((result) => {
            console.log('🐛: loadMyWokspace -> result palette', result)
            palettes = result.data
          }).catch((err) => {
            console.log(err)
          })
        await axios
          .get(`http://localhost:3000/gradient/my/${workspace._id}`)
          .then((result) => {
            console.log('🐛: loadMyWokspace -> result gadient', result)
            gradients = result.data
          }).catch((err) => {
            console.log(err)
          })
      }
      commit('SET_MY_ITEMS', [].concat(workspace.colors_id, palettes, gradients))
    },

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
    },

    // Options
    connection ({ commit }, token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      commit('auth/SET_ACCESS_TOKEN', token, { root: true })
      router.push({ name: 'home' })
    },
    disconnect ({ commit }) {
      axios.defaults.headers.common['Authorization'] = null
      commit('SET_MY_WORKSPACE', [])
      commit('SET_TOKEN', null)
    },
    chooseConnection ({ commit }, action) {
      commit('SET_SIGN_IN_ACTION', action)
    }
  }
})
