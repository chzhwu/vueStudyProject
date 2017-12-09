import Vue from 'vue'
import axios from 'axios'
import '../statics/css/mui.min.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

axios.defaults.baseURL = 'http://localhost:8899'
Vue.prototype.$http = axios
