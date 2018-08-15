import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    leftMenu: false,
    rightMenu: false,
    userInfo: '',
    menuInfo: [],
    outerMenu: false,
    innerMenu: false,
    treeNode: [],
    allMenus: [],
    pages: '',
    rows: ''
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
    },
    showOuterMenu (state, show) {
      state.outerMenu = show
    },
    showInnerMenu (state, show) {
      state.innerMenu = show
    },
    transmitNode (state, node) {
      state.treeNode = node
    },
    AllMenus (state, menu) {
      state.allMenus = menu
    },
    currentPage (state, page) {
      state.page = page
    },
    currentSize (state, row) {
      state.row = row
    }
  }
})
