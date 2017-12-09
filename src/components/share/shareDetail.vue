<template>
  <div class="mui-content">
      <div class="title">
          <p>{{info.title}}</p>
          <span>{{info.add_time|data}}</span>
          <span>{{info.click}}次浏览</span>
      </div>
    <ul class="smImg mui-row">
        <li class="mui-col-sm-3 mui-col-xs-4" v-for="(item,index) in imgArr" :key="index">
            <a class="mui-navigate-right">
                <img :src="item.src" alt="">
            </a>
        </li>
    </ul>
    <p class="content">{{info.content}}</p>
    <div class="item" v-for="(item,index) in comments" :key="index">
        <div class="content">{{item.content}}</div>
        <div>
            <span class="user">{{item.user_name}}</span>  <span>{{item.add_time|getDate}}</span>
        </div>
    </div>
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
      return {info:{},imgArr:[],comment:[]}
  },
  created(){
      this.getShareDetail()
      this.getImgArr()
      this.getComment()
  },
  methods:{
      getShareDetail(){
          let url='/api/getimageInfo/'+this.$route.params.id
          this.$http.get(url).then((res)=>{
              if(res.status==200&&res.data.status==0){
                  this.info=res.data.message[0]
              }
          })
      },
      getImgArr(){
          let url='/api/getthumimages/'+this.$route.params.id
          this.$http.get(url).then((res)=>{
            //   console.log(res)
            if(res.status==200&&res.data.status==0){
                  this.imgArr=res.data.message
              }
          })
      },
      getComment(){
        let url='/api/getcomments/'+this.id+'?pageindex='+this.page
        this.$http.get(url).then((res)=>{
            if(res.status==200&&res.data.status==0){
                if(res.data.message.length>0){
                    this.comments=res.data.message
                }
              }
          })
      },
        getMoreComment(){
            this.page++
            let url='/api/getcomments/'+this.id+'?pageindex='+this.page
            this.$http.get(url).then((res)=>{
                if(res.status==200&&res.data.status==0){
                    if(res.data.message.length>0){
                        this.comments=this.comments.concat(res.data.message)
                        console.log(this.comments)
                    }
                }
            })
        },
        postComment(){
            // alert(this.id)
            if(this.com==''){
                return alert('内容不能为空')
            }else{
                let url='/api/postcomment/'+this.id
                let content=this.com
                this.$http.post(url,'content='+content).then((res)=>{
                    // console.log(res)
                    this.getComment()
                    this.com=''
                })
            }
            
        }
  },
  filters:{
      data(value){
        var value=new Date(value)
        var year=value.getFullYear(value)
        var mouth=value.getMonth(value)
        var date=value.getDate(value)
        return value=year+'-'+mouth+'-'+date
      }
  }
}
</script>
<style scoped>
    .smImg{
        margin:0;
        padding:0;
        list-style:none;
    }
    .smImg li{
        padding:10px 20px 0 20px;
    }
    .smImg img{
        width:100%;
    }
    .title{
        padding:20px 10px;
        border-bottom:1px solid #ccc;
    }
    .title p{
        font-weight: bold;
        color:#0094ff;
        font-size:16px;
    }
    .title span{
        color:grey;
        font-size:12px;
        margin-right:20px;
    }
    .content{
        padding:10px;
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

