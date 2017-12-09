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
    <comment :id="id"></comment>
  </div>
</template>
<script>
import comment from '../common/comment.vue'

export default {
    
  data(){
      return {info:{},imgArr:[]}
  },
  created(){
      this.getShareDetail()
      this.getImgArr()
  },
  props:['id'],
  methods:{
      getShareDetail(){
          let url='/api/getimageInfo/'+this.id
          this.$http.get(url).then((res)=>{
              if(res.status==200&&res.data.status==0){
                  this.info=res.data.message[0]                                               
              }
          })
      },
      getImgArr(){
          let url='/api/getthumimages/'+this.id
          this.$http.get(url).then((res)=>{
            //   console.log(res)
            if(res.status==200&&res.data.status==0){
                  this.imgArr=res.data.message
              }
          })
      }
  },
  components:{
      comment
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
</style>

