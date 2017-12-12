<template>
  <div class="mui-content">
      <div class="title">{{ info.title }}</div>
      <div class="content" v-html="info.content">
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return {info:{}}
  },
  props:['id'],
  created(){
      this.getIntroduce()
  },
  methods:{
      getIntroduce(){
          this.$http
            .get('/api/goods/getdesc/'+this.id)
            .then((res) => {
                console.log(res)
                if(res.status == 200 && res.data.status == 0){
                    this.info = res.data.message[0]
                }
            })
            .catch((err) => {
                console.error(err)
            })
      }
  }
}
</script>
<style>
    .mui-content{
        background:#fff;
    }
    .title{
        padding:20px 10px;
        border-bottom:1px solid #ccc;
        color:#0094ff;
        font-size:24px;
        line-height:30px;
        font-weight:bold;
    }
    .content{
        padding:20px 10px;
    }
    .content img{
        width:100%;
        height:200px;
    }
</style>
