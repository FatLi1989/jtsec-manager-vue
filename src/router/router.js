import Login from '../view/login/Login.vue'
import Index from '../view/index/Index.vue'
import Menu from '../view/content/menu/Mune.vue'
import User from '../view/content/user/User'
import Role from '../view/content/role/Role'
import ManagerJob from '../view/content/job/ManagerJob'
import AnalysisJob from '../view/content/job/AnalysisJob'
import Home from '../view/content/home/Home'
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
        path: '/home',
        component: Home
      }, {
        path: '/menu',
        component: Menu
      }, {
        path: '/user',
        component: User
      }, {
        path: '/role',
        component: Role
      }, {
        path: '/manager/job',
        component: ManagerJob
      }, {
        path: '/analysis/job',
        component: AnalysisJob
      }],
      redirect: '/home'
    }
  ]
});
export default router
