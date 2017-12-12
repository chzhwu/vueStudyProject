<template>
    <div class="mui-content">
        <div class="detail">
            <div class="top">
              <swipe :imgurl="imgurl"></swipe>
            </div>
        </div>
        <div class="sell">
            <h4>{{ goods.title }}</h4>
            <div class="price">
                市场价：<s>￥{{ goods.market_price }}</s> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                销售价：<span>￥{{ goods.sell_price }}</span>
            </div>
            <div class="num">
                购买数量：<number v-on:buynum="buynum" :stock="goods.stock_quantity"></number>
                <transition
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter">
                    <div v-if="show" class="ball"></div>
                </transition>
            </div>
            <div class="button">
                <button class="mui-btn mui-btn-primary">立刻购买</button>
                <button @click="updateCar" class="mui-btn mui-btn-danger">加入购物车</button>
            </div>
        </div>

        <div class="param">
            <h5>商品参数</h5>
            <div class="info">
                <p>商品编号：{{ goods.goods_no }}</p>
                <p>库存情况：{{ goods.stock_quantity }}件</p>
                <p>上架时间：{{ goods.add_time | date('YYYY-MM-DD HH:mm') }}</p>
            </div>
        </div>
        
        <div class="footer">
            <a class="mui-btn mui-btn-primary mui-btn-outlined" @click="introduce">图文介绍</a>
            <a class="mui-btn mui-btn-danger mui-btn-outlined" @click="comment">商品评论</a>
        </div>
    </div>
</template>
<script>
import swipe from '../../common/swipe.vue'
import number from './number.vue'
import vueObj from '../../common/communication'
import { setData } from '../../common/localstorageHple'
export default {
  components:{
      swipe,
      number
  },
  props:['id'],
  data(){
      return {
          imgurl:'/api/getthumimages/'+this.id,
          goods:{},
          num:1,
          show:false
      }
  },
  created(){
      this.getGoodsDetail()
  },
  methods:{
      getGoodsDetail(){
          let url = '/api/goods/getinfo/'+this.id
          this.$http.get(url).then((res) => {
            // console.log(res)
            if(res.status == 200 && res.data.status == 0){
                this.goods = res.data.message[0]
            }
          }).catch((err) => {
              console.error(err)
          })
      },
      comment(){
          this.$router.push({name:'goodsComment',params:this.id})
      },
      introduce(){
          this.$router.push({name:'introduce',params:this.id})
      },
      buynum(num){
          this.num=num
      },
      updateCar(){
        //   console.log(this.num)
        this.show = true
        vueObj.$emit('buynum',this.num)
        let goods = {'id':this.id,'count':this.num}
        setData(goods)
        console.log(setData)
      },
      beforeEnter(el){
          el.style.transform='translate(0,0)'
      },
      enter(el, done){
          let badge = document.querySelector('.mui-badge')
          let ballX = el.getBoundingClientRect().left
          let ballY = el.getBoundingClientRect().top
          let badgeX = badge.getBoundingClientRect().left
          let badgeY = badge.getBoundingClientRect().top
          let x = badgeX - ballX
          let y = badgeY - ballY
          el.style.transform = `translate(${x}px,${y}px)`
          done()
      },
      afterEnter(el){
          this.show = false
      }
  }
}
</script>
<style scoped>
    .num {
        position: relative;
    }
    
    .ball {
        left: 115px;
        top: 3px;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: red;
        transition: all 0.5s linear;
        z-index: 1000;
        
    }
    
    .mui-content {
        background-color: #fff;
    }
    
    .top,
    .sell,
    .param,
    .footer {
        border: 1px solid rgba(92, 92, 92, 0.7);
        border-radius: 5px;
        margin: 5px;
        padding: 10px;
    }
    
    .sell h4 {
        color: dodgerblue;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
    
    .price,
    .num,
    .button {
        margin: 10px;
        font-size: 15px;
    }
    
    .price span {
        font-size: 18px;
        color: red;
    }
    
    .param h5 {
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
    
    .info {
        margin-top: 10px;
        margin-left: 20px;
    }
    
    .info p {
        margin: 0;
    }
    
    .footer .mui-btn {
        width: 100%;
    }
    
    .footer .mui-btn-danger {
        margin-top: 10px;
    }
</style>
