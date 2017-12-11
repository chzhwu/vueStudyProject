# vueStudyProject
This is my first vue project

# vue项目练习

## 项目组件结构

```
|-app
|---home                  //主页
|	|---news              //新闻列表页
|	|	|---newsDetail    //新闻详情页
|	|	|---share             //图片分享页
|	|	|	|---shareDetail   //图片分享详情
|	|	|---...
|	|---menber                //会员
|	|---shopcar               //购物车
|	|---search                //搜索
```



## 配置文件

### 入口文件app.js

+ 引入vue，VueRouter --------vue框架和路由模块
+ 引入plugins.js   ------插件管理模块
+ 实例化vue对象

### 插件管理模块plugins.js

- 引入vue
- 引入mint-ui插件以及style样式  并全局配置
- 引入mui样式文件
- 引入axios插件  挂载到Vue的原型prototype上

```javascript
//注册mint-ui
Vue.use(Mint)
//配置路由的基路径
axios.defaults.baseURL = 'http://localhost:8899'
//把axios挂载到Vue的原型上
Vue.prototype.$http = axios
```



### 路由管理模块router.js

- 引入vue
- 引入模板 
- 配置路由地址注册模板
- 导出路由对象

```javascript
export default {
    router : new VueRouter({
        linkActiveClass:'mui-active',
        routes:[
            {path:'/',redirect:'/home'}
        ]
    })
}
```



### 全局过滤器模块

- 引入vue
- 引入moment 格式时间模块
- 配置全局过滤器date

```javascript
import moment from 'moment'
import Vue from 'vue'

Vue.filter('date',(value,type)=>{
    return moment(value).format(type)
})
```



--------------------------

## 各组件开发



### app.vue组件

- 建立公共的头和尾
- 作为路由的展示的主要组件

```html
<template>
	<div class="container">
    <header class="mui-bar mui-bar-nav">
    </header>
    <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/home">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </router-link>
    </nav>
        <router-view></router-view>
    </div>
</template>
```
### 图片查看

- 安装并引入插件vue-preview
- 配置插件 ------查看文档

```html
npm i vue-preview --save
import vuePreview from 'vue-preview'
<img class="preview-img" @click="$preview.open(index,images)" :src="item.src" alt="">

  this.images.forEach(item => {
    item.w=600
    item.h=400
})
```



### 返回按钮

- 当路由请求路径为/home,/member,/shopcar,/search时不显示
- $router是路由对象   go(),back(),push()...
- $route是路由规则  （path,params）

### 商品列表上拉加载

- 使用mint-ui的API-------- loadmore
- 查看文档

### 商品详情-向购物车传递数量

- 利用vue 的自定义事件
- 子组件向父组件传递

```html
购买数量：<number v-on:buynum="buynum" :stock="goods.stock_quantity"></number>
buynum(num){
   this.num=num
},
```

```javascript
getnum(){
  this.$emit('buynum',this.num)
}
```

- 非父子组件传递
- 需要一个外来对象进行绑定监听

```javascript
import Vue from 'vue'
let vueObj = new Vue
export default vueObj
```

```html
<button @click="updateCar" class="mui-btn mui-btn-danger">加入购物车</button>
updateCar(){
    //   console.log(this.num)
    vueObj.$emit('buynum',this.num)
}
```

```javascript
vueObj.$on('buynum',function(num){
    // console.log(num)
    this.num = num
}.bind(this))
```



