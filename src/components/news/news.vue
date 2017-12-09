<template>

    <div class="mui-content">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item,index) in arr" :key="index">
                <router-link :to="{path:'/newsDetail/'+item.id}" append>
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span class="createTime">发表时间：{{item.add_time|getDate}}</span>
                            <span class="clickNum">点击数量:{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>

</template>
<script>
    import newsDetail from './newsDetail.vue'
    export default {

        data:function(){
            return {arr:[]}
        },
        created(){
            this.getNewsList()
        },
        methods:{
            getNewsList(){
                let url='/api/getnewslist'
                this.$http.get(url).then((res)=>{
                    // console.log(res)
                    if(res.status == 200 && res.data.status == 0){
                        this.arr=res.data.message
                    }else{
                        this.$toast('数据获取失败')
                    }
                })
            }
        },
        filters:{
            getDate(value){
                var value=new Date(value)
                var year=value.getFullYear(value)
                var mouth=value.getMonth(value)
                var date=value.getDate(value)
                return value=year+'年'+mouth+'月'+date+'日'
            }
        }
    }
</script>
<style scoped>
    .createTime{
        color:#007aff;
        float:left;
    }
    .clickNum{
        color:#007aff;
        float:right;
    }
</style>