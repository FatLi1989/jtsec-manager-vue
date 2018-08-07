import Login from '../view/login/Login.vue'
import Index from '../view/index/Index.vue'
import Menu from '../view/content/Menu/Mune.vue'
import Info from '../view/content/Info.vue'
import Try from '../view/content/Try.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '*', redirect: '/login'},
    {path: '/login', component: Login},
    {
      path: '/index',
      component: Index,
      children: [{
        path: '/menu',
        component: Menu
      }, {
        path: '/info',
        component: Info
      }, {
        path: '/try',
        component: Try
      }]
    }
  ]
});
export default router
