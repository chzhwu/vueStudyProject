<template>
  <div class="mui-content">
      <div class="topNav">
        <ul>
          <li><a href="javascript:;" @click="getCatImages(-1)">全部</a></li>
          <li v-for="(item,index) in cate" :key="index">
            <a href="javascript:;" @click="getCatImages(item.id)">{{item.title}}</a>
          </li>
        </ul>
      </div>
      <div class="pic-content">
        <ul>
          <li v-for="(item,index) in images" :key="index">
            <router-link :to="'/shareDetail/'+item.id">
              <img :src="item.img_url" alt="">
              <p><span class="title">{{item.title}}</span>{{item.zhaiyao}}</p>
            </router-link>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {catid:-1,images:[],cate:[]}
  },
  created(){
    this.getImgCategory()
    this.getImages()
  },
  methods:{
    getImgCategory(){
      let url='/api/getimgcategory'
      this.$http.get(url).then((res)=>{
        // console.log(res)
        if(res.status==200&&res.data.status==0){
          this.cate=res.data.message
        }
      })
    },
    getImages(){
      let url='/api/getimages/'+this.catid
      this.$http.get(url).then((res)=>{
        console.log(res)
        if(res.status==200&&res.data.status==0){
          this.images=res.data.message
        }
      })
    },
    getCatImages(id){
      this.catid=id
      // console.log(this.catid)
      this.getImages()
    }
  }
}
</script>
<style scoped>
ul{
  list-style:none;
  margin:0;
  padding:0;
}
  .topNav{
    overflow-x:auto;
    overflow-y:scroll;
  }
  .topNav>ul{
    width:880px;
    padding:20px 10px;
  }
  .topNav>ul>li{
    display:inline-block;
    margin-left:15px;
    font-size:14px;
  }
  .pic-content>ul>li{
    position:relative;
  }
  .pic-content>ul>li img{
    width:100%;
    height:300px;
  }
  .pic-content>ul>li p{
    position: absolute;
    left: 0;
    bottom:0;
    color:#fff;
    background:rgba(0,0,0,0.4);
  }
  .pic-content .title{
    font-weight: bold;
  }
</style>

