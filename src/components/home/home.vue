<template>
<div class="mui-content">

    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in imgArr" :key="index"><a href="#"><img :src="item.img" alt=""></a></mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) in arr" :key="index"><router-link :to="item.url">
            <span :class="item.className"></span>
            <div class="mui-media-body">{{item.title}}</div></router-link>
        </li>
    </ul>
</div>
</template>
<script>
    import Vue from 'vue';
    import { Swipe, SwipeItem } from 'mint-ui';
    import 'mint-ui/lib/style.css'
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        data:function(){
            return {arr:[],imgArr:[]}
        },
        created(){
            this.getHomeNav()
            this.getSwiper()
        },
        methods:{
            getHomeNav(){
                let url = '/api/getmenus'
                this.$http.get(url).then((res)=>{
                    console.log(res)
                    if(res.status==200&&res.data.status==0){
                        this.arr=res.data.message
                        this.arr.forEach(element => {
                            element.className+=' mui-icon'
                        });
                    }else{
                        alert('请求失败')
                    }
                })
                .catch(function(err){
                    console.error(err)
                })
            },
            getSwiper(){
                let url='/api/getlunbo'
                this.$http.get(url).then((res)=>{
                    console.log(res)
                    this.imgArr=res.data.message
                })
            }
        }
    }
</script>
<style scoped>
    .icon-news{
        background:url(../../../statics/images/menu1.png);
    }
    .icon-share{
        background:url(../../../statics/images/menu2.png);
    }
    .icon-buy{
        background:url(../../../statics/images/menu3.png);
    }
    .icon-feedback{
        background:url(../../../statics/images/menu4.png);
    }
    .icon-video{
        background:url(../../../statics/images/menu5.png);
    }
    .icon-contact{
        background:url(../../../statics/images/menu6.png);
    }
    .mui-table-view .mui-table-view-cell{
        background:#fff;
    }
    .mui-icon{
        width:50px;
        height:50px;
        background-repeat:round;
    }
    .mint-swipe{
        height:200px;
    }
    .mint-swipe img{
        width:100%;
        height:100%;
    }
</style>