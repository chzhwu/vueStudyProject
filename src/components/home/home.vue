<template>
<div class="mui-content">

    <swipe :imgurl="imgurl"></swipe>
    
    <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) in arr" :key="index"><router-link :to="item.url">
            <span :class="item.className"></span>
            <div class="mui-media-body">{{item.title}}</div></router-link>
        </li>
    </ul>
</div>
</template>
<script>
import swipe from '../common/swipe.vue'
    export default {
        data:function(){
            return {arr:[],imgurl:'/api/getlunbo'}
        },
        created(){
            this.getHomeNav()
            
        },
        methods:{
            getHomeNav(){
                let url = '/api/getmenus'
                this.$http.get(url).then((res)=>{
                    // console.log(res)
                    if(res.status==200&&res.data.status==0){
                        this.arr=res.data.message
                        this.arr.forEach(element => {
                            element.className+=' mui-icon'
                        });
                    }else{
                        this.$toast('请求失败')
                    }
                })
                .catch(function(err){
                    console.error(err)
                })
            }
        },
        components:{
            swipe
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
    
</style>