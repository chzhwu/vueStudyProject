import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './components/home/home.vue'
import member from './components/member/member.vue'
import shopcar from './components/shopcar/shopcar.vue'
import search from './components/search/search.vue'
import newsList from './components/news/news.vue'
import newsDetail from './components/news/newsDetail.vue'
import share from './components/share/share.vue'
import shareDetail from './components/share/shareDetail.vue'
export default {
    router : new VueRouter({
        linkActiveClass:'mui-active',
        routes:[
            {path:'/',redirect:'/home'},
            {path:'/home',component:home},
            {path:'/member',component:member},
            {path:'/shopcar',component:shopcar},
            {path:'/search',component:search},
            {path:'/news',component:newsList},
            {path:'/newsDetail/:id',component:newsDetail,props:true},
            {path:'/share',component:share},
            {path:'/shareDetail/:id',component:shareDetail,props:true}
        ]
    })
}