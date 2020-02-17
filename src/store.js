import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalC: false,
    connected: false,
    colors: []
  },
  mutations: {
    SET_COLORS (state, colors) {
      state.colors = colors
    },
    SET_MODAL (state, modalC) {
      state.modalC = modalC
    }
  },
  actions: {
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
    openModal_c ({ commit }) {
      let modalC = !this.state.modalC
      commit('SET_COLORS', modalC)
    }
  },
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(todo => todo.done)
    // }
  }
})
