// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import './assets/css/common.css';
import './assets/js/bootstrap.js';
import routers from './router/router.js'
/* vuex */
import store from './store'
/* 引入ajax框架axios配置 */
import axios from './axios'

/*   设置 Vue.config.productionTip = false 来关闭生产模式下给出的提示 */
Vue.config.productionTip = false;

/* 将axios挂载到Vue原型上方便调用 */
 Vue.prototype.$ajax = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: routers,
  store,
  render: h => h(App)
});
