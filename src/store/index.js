import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'

import axios from '@/axios'
import * as modules from '@/store/modules'

Vue.use(Vuex)

// const persist = new VuexPersist({
//   storage: window.localStorage,
//   reducer: state => ({
//     auth: state.auth,
//     workspace: state.workspace,
//     workspaces: state.workspaces
//   })
// })

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
        const { data: colors } = await axios.get('/color')
        const { data: gradients } = await axios.get('/gradient')
        const { data: palettes } = await axios.get('/palette')

        commit('SET_CONTENT', [].concat(colors, gradients, palettes))
      } catch (error) {
        console.log('TCL: loadContent -> error', error)
      }
    },

    // permet de trier items
    sortItems () {
      this.state.items.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },

    // permet de trier items par like
    sortItemsLike () {
      this.state.items.sort(function (a, b) {
        return b.likeCount - a.likeCount
      })
    },

    // permet de melanger les items
    randomItems () {
      this.state.items.sort(function () {
        return 0.5 - Math.random()
      })
    },

    // permet de trier mes items par leurs date
    sortMyItems () {
      this.state.myitems.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },

    // permet de trier items par leurs likes
    sortMyLike () {
      this.state.myitems.sort(function (a, b) {
        return b.likeCount - a.likeCount
      })
    },

    // permet de melanger les items
    randomMyItems () {
      this.state.myitems.sort(function () {
        return 0.5 - Math.random()
      })
    },

    // permet de recuperer tout mes workspaces
    loadMyWokspaces ({ commit, dispatch }, id) {
      console.log('TCL: loadMyWokspace -> id', id)
      axios
        .get(`/workspace/my/${id}`)
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
          .get(`/palette/my/${workspace._id}`)
          .then((result) => {
            console.log('🐛: loadMyWokspace -> result palette', result)
            palettes = result.data
          }).catch((err) => {
            console.log(err)
          })
        await axios
          .get(`/gradient/my/${workspace._id}`)
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

    chooseConnection ({ commit }, action) {
      commit('SET_SIGN_IN_ACTION', action)
    }
  }
  // plugins: [persist.plugin]
})
