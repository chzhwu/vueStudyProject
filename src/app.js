import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import app from './app.vue'
axios.defaults.baseURL = 'http://localhost:8899'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.use(VueRouter)
Vue.prototype.$http = axios
import '../statics/css/mui.min.css'

import router from './router'

let vm = new Vue({
  el: '#app',
  router: router.router,
  render: function (createElement) {
    return createElement(app)
  }
})
