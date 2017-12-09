<template>

    <div class="mui-content main">
        <div class="articleTitle">
            <h4>{{info.title}}</h4>
            <span>{{info.add_time|getDate}}</span><span class="click">{{info.click}}次浏览</span>
        </div>
        <div class="articleContent" v-html="info.content">
            <!--{{$route}}-->
        </div>
        <comment :id="id"></comment>
    </div>

</template>
<script>
    import { Toast } from 'mint-ui';
    import comment from '../common/comment.vue'
    import '../../../statics/css/newsDetail.css'
    export default {
        data(){
            return {
                info:{}
            }
        },
        created(){
            this.getNewsDetail()
        },
        components:{
            'comment':comment
        },
        props:['id'],
        methods:{
            getNewsDetail(){
//                console.log(this.$route.params.id)
                let url='/api/getnew/'+this.id
                this.$http.get(url).then((res)=>{
//                    console.log(res)
                    if(res.data.status==0){
                        this.info=res.data.message[0]
                    }else{
                        console.log('出错')
                    }
                })
            },
            
        },
        filters:{
            getDate(value){
                var value=new Date(value)
                var year=value.getFullYear(value)
                var mouth=value.getMonth(value)
                var date=value.getDate(value)
                return value=year+'-'+mouth+'-'+date;
            }
        }
    }
</script>
<style scoped>
    .main{
        padding-left:10px;
        padding-right:10px;
    }
    .articleTitle{
        padding-bottom:10px;
        border-bottom:1px solid #ccc;
    }
    .click{
        margin-left:10px;
    }
    .articleContent{
        padding-top:10px;
    }
    
</style>