import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import app from './app.vue'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
import './filters'
import './plugins'
import '../statics/css/mui.min.css'
import 'mint-ui/lib/style.css'
import router from './router'

let vm = new Vue({
  el: '#app',
  router: router.router,
  render: function (createElement) {
    return createElement(app)
  },
  created() {
    this.$http.interceptors.request.use((config) => {
      this.$indicator.open('加载中...')
      return config;
    })
    this.$http.interceptors.response.use((response) => {
      this.$indicator.close()
      return response
    })
  }
})
