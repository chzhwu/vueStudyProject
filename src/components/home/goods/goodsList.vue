<template>
  <div ref="content" class="mui-content">
      <mt-loadmore :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="mui-table-view mui-grid-view">
        <li  class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in goods" :key="item.id">
            <router-link :to="'/buy/'+item.id">
                <img class="mui-media-object" :src="item.img_url">
                <div class="mui-media-body">{{item.title}}</div>
            </router-link>
            <div class="bottom">
                <h6>
                    <span>￥{{item.sell_price}}</span>
                    <s>￥{{item.market_price}}</s>
                </h6>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </div>
            </div>     
        </li>
      </ul> 
      </mt-loadmore>
    </div>
</template>
<script>
export default {
  data(){
      return {goods:[],page:1,allLoaded:false}
  },
  created(){
      this.getGoodsList()
      
  },
  mounted(){
    let height = document.documentElement.clientHeight
    this.$refs.content.style.height = height +'px'
  },
  methods:{
      getGoodsList(){
          let url='/api/getgoods?pageindex='+this.page
          this.$http.get(url).then((res) => {
            //   console.log(res)
            //   console.log(this.page)
              if(res.status == 200 && res.data.status == 0){
                  this.goods = this.goods.concat(res.data.message)
                  if(res.data.message.length==0){
                      this.allLoaded = true
                  }
                  this.$refs.loadmore.onBottomLoaded();
              } else {
                  console.log('请求服务器错误')
              }
          }).catch((err) => {
              console.error(err)
          })
      },
      loadBottom(){
        this.page++
        this.getGoodsList()
      }
  }
}
</script>
<style scoped>
    .mui-table-view:before {
        display: none;
    }
    
    .mui-table-view:after {
        display: none;
    }
    .mint-loadmore{
        padding-bottom:50px;
    }
    .mui-content>.mui-table-view:first-child {
        margin-top: 0px;
    }
    
    .mui-table-view.mui-grid-view .mui-table-view-cell {
        margin-right: 0px;
        padding: 0px;
    }
    
    .mui-table-view.mui-grid-view {
        padding: 5px;
    }
    
    .mui-table-view-cell {
        border: 1px solid rgba(92, 92, 92, 0.5);
        box-shadow: 0 0 4px #666;
        padding: 4px;
        margin-top: 5px;
        margin-left: 5px;
        width: 48%;
    }
    
    .mui-table-view-cell img {
        width: 100%;
    }
    
    .mui-table-view-cell:after {
        display: none;
    }
    
    .mui-table-view-cell>a {
        margin: 0;
    }
    
    .mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn) {
        margin: 0;
        margin-bottom: 5px;
        text-align: left;
        color: #000;
    }
    
    .bottom {
        text-align: left;
        background-color: rgba(92, 92, 92, 0.1);
        padding: 5px;
    }
    
    .bottom>h6>span {
        color: red;
        font-size: 14px;
        margin-right: 20px;
    }
    
    .bottom>.sell {
        margin-top: 15px;
        color: rgba(92, 92, 92, 0.8);
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
</style>
