import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../page/home'

Vue.use(VueRouter);
 
const router = new VueRouter({
  mode: 'hash', // 使用 hash 模式
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  ]
});
 
export default router;