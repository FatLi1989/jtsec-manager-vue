import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    leftMenu: true,
    rightMenu: false,
    userInfo: '',
    menuInfo: Array
  },
  mutations: {
    leftMenuState (state, leftMenu) {
      state.leftMenu = leftMenu
    },
    rightMenuState (state, rightMenu) {
      state.rightMenu = rightMenu;
    },
    loginInfo (state, info) {
      state.userInfo = info
    },
    setMenuInfo (state, menu) {
      state.menuInfo = menu
    }
  }
})
