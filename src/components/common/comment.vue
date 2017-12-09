<template>
  
<div class="comment">
        <!--添加评论-->
    <h4>提交评论</h4>

    <div class="submitcomment">
        <textarea placeholder="请输入评论内容" v-model="com"></textarea>
        <button class="mui-btn mui-btn-primary" @click="postComment">发表</button>
    </div>
    
    <div class="title">
        <h4>评论列表</h4>
    </div>    
    
    <!--评论列表-->
    
    <div class="item" v-for="(item,index) in comments" :key="index">
        <div class="content">{{item.content}}</div>
        <div>
            <span class="user">{{item.user_name}}</span>  <span>{{item.add_time|getDate}}</span>
        </div>
    </div>

    <div class="more">
        <button class="mui-btn mui-btn-primary mui-btn-outlined" @click="getMoreComment">加载更多</button>
    </div>

</div>

</template>
<script>
export default {
  data(){
      return {
            comments:[],
            com:'',
            page:1}
  },
  created(){
      this.getComment()
  },
  props:['id'],
  methods:{
        getComment(){
            let url='/api/getcomments/'+this.id+'?pageindex='+this.page
            this.$http.get(url).then((res)=>{
                if(res.status==200&&res.data.status==0){
                    if(res.data.message.length>0){
                        if(this.comments.length>0){
                            this.comments=this.comments.concat(res.data.message)
                        }else{
                            this.comments=res.data.message
                        }
                    }
                }
            })
        },
        getMoreComment(){
            this.page++
            this.getComment()
        },
        postComment(){
            // alert(this.id)
            if(this.com==''){
                return this.$toast('内容不能为空')
            }else{
                let url='/api/postcomment/'+this.id
                let content=this.com
                this.$http.post(url,'content='+content).then((res)=>{
                    // console.log(res)
                    this.page=1
                    this.getComment()
                    this.com=''
                })
            }
        }
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
    .submitcomment{
        text-align: center;
        padding-bottom:10px;
        border-bottom:1px solid #ccc;
    }
    .submitcomment>button,.submitcomment>textarea{
        width:96%;
    }
    .item {
        padding: 15px 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
    }
    
    .item div {
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
    }
    
    .item span {
        font-size: 15px;
    }
    
    .item .user {
        color: skyblue;
    }
    .more{
        text-align: center;
        padding-top:10px;
        border-top:1px solid #ccc;
    }
    .more>button{
        width:96%;
    }
</style>
