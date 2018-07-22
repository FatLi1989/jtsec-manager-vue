import Login from '../view/login/Login.vue'
import index from '../view/index/index.vue'
import VueRouter from 'vue-router'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '*', redirect: '/login'},
    {path: '/login', component: Login},
    {path: '/index', component: index}
  ]
});
export default router
