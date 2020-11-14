// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import 'font-awesome/css/font-awesome.min.css'

import ElementUI from 'element-ui'
import './assets/theme/element-#52C9E1/index.css'
Vue.use(ElementUI)

import store from './store/store'
Vue.use(store)

import axios from 'axios'
Vue.prototype.$axios = axios

// Vue.use(xterm)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
