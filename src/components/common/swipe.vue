<template>
  <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in imgArr" :key="index"><a href="#"><img :src="item.img" alt=""></a></mt-swipe-item>
    </mt-swipe>
</template>
<script>
export default {
  data(){
      return {imgArr:[]}
  },
  created(){
      this.getSwiper()
  },
  props:['imgurl'],
  methods:{
      getSwiper(){
        let url=this.imgurl
        this.$http.get(url).then((res)=>{
            console.log(res)
            this.imgArr=res.data.message
        })
      }
  }
}
</script>
<style scoped>
    .mint-swipe{
        height:200px;
    }
    .mint-swipe img{
        width:100%;
    }
</style>
