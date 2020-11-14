import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Dashboard from '@/pages/Dashboard'
import Terminal from '@/pages/Terminal'

Vue.use(Router)


let routes = [{
  path: '/',
  component: Login
}]

routes.push({
  path: '/Dashboard',
  component: Dashboard,
  hidden: true,
  name: 'Dashboard'
})

routes.push({
  path: '/Terminal',
  component: Terminal,
  hidden: true,
  name: 'Terminal'
})




const router = new Router({
  mode: 'history',  //去掉url中的#
  base:'/lhcz-demo-crd/',
  routes: routes
})

export default router
