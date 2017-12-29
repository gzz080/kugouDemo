// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import mint from 'mint-ui'
import axios from 'axios'
Vue.use(mint)
import 'mint-ui/lib/style.css'
import './assets/scss/reset.scss'
Vue.prototype.$http=axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App)
})
