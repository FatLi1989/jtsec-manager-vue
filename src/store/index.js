import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    leftMenu: true,
    rightMenu: false
  },
  mutations: {
    leftMenu (state, leftMenu) {
      state.leftMenu = leftMenu
    },
    rightMenu (state, rightMenu) {
      state.rightMenu = rightMenu;
    }
  }
})
