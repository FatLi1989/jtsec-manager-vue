// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import './assets/css/common.css';
import './assets/js/bootstrap.js';
import routers from './router/router.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: routers,
  render: h => h(App)
});