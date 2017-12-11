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
import buy from './components/home/goods/goodsList.vue'
import buyDetail from './components/home/goods/goodsDetail.vue'
import goodsComment from './components/home/goods/goodsComment.vue'

let router = new VueRouter({
  linkActiveClass: 'mui-active',
  routes: [
    {path: '/',redirect: '/home'},
    {path: '/home',meta: {title: '首页'},component: home},
    {path: '/member',meta: {title: '会员中心'},component: member},
    {path: '/shopcar',meta: {title: '购物车'},component: shopcar},
    {path: '/search',meta: {title: '搜索'},component: search},
    {path: '/news',meta: {title: '新闻'},component: newsList},
    {path: '/newsDetail/:id',meta: {title: '新闻详情'},component: newsDetail,props: true},
    {path: '/share',meta: {title: '图片分享'},component: share},
    {path: '/shareDetail/:id',meta: {title: '图片分享'},component: shareDetail,props: true},
    {path: '/buy',component: buy},
    {path: '/buy/:id',component:buyDetail,props: true},
    {name:'goodsComment',path:'/goodsComment/:id',component:goodsComment,props:true}
  ]
})

router.afterEach((to, from) => {
  // console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '欢迎!'
  }
})
export default router
