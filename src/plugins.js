import Vue from 'vue'
import axios from 'axios'
import '../statics/css/mui.min.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
//注册mint-ui
Vue.use(Mint)
//配置路由的基路径
axios.defaults.baseURL = 'http://localhost:8899'
//把axios挂载到Vue的原型上
Vue.prototype.$http = axios
