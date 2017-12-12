<template>

    <div class="container">
    <header class="mui-bar mui-bar-nav">
        <a v-if="show" @click='goback' class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">某宝</h1>
    </header>
    <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/home">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/member">
            <span class="mui-icon mui-icon-email"></span>
            <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item" to="/shopcar">
            <span class="mui-icon mui-icon-contact"><span class="mui-badge">{{ count }}</span></span>
            <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="/search">
            <span class="mui-icon mui-icon-gear"></span>
            <span class="mui-tab-label">搜索</span>
        </router-link>
    </nav>
        <router-view></router-view>
    </div>




</template>
<script>
    import vueObj from './components/common/communication'
    import { getData } from './components/common/localstorageHple'
    export default {
        data:function(){
            return {
                msg:'hello vue',
                show:false,
                count:0
            };
        },
        created() {
            this.judgeback()
            vueObj.$on('buynum',function(num){
                // console.log(num)
                this.count += num
            }.bind(this))
            this.getTotal()
            vueObj.$on('update',() => {
                this.getTotal()
            })
        },
        methods:{
            goback(){
                this.$router.back()
            },
            judgeback() {
                let arr = ['/home', '/member', '/shopcar', '/search']
                if(arr.indexOf(this.$route.path)==-1) {
                    this.show = true
                } else {
                    this.show = false
                }
            },
            getTotal(){
                let num = 0
                let data = getData()
                data.forEach((item) => {
                    num += item.count
                })
                this.count = num
            }
        },
        watch:{
            '$route':function(value){
                this.judgeback()
            }
        }
    }
</script>

<style scoped>
    p{
        color:red;
    }
</style>