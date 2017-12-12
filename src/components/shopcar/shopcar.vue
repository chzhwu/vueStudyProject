<template>
<div class="mui-content">
    <div class="row" v-for="(item,index) in goods" :key="item.id">
        <div class="left">
            <mt-switch v-model="select[index]"></mt-switch>
        </div>
        <div class="center">
            <img width="75" height="75" :src="item.thumb_path" alt="">
        </div>
        <div class="right">
            <h4>
                {{item.title}}
            </h4>
            <span>￥{{ item.sell_price }}</span>
            <number @getcount="getcount" :number="item.count" :id="item.id"></number>
            <a >删除</a>
        </div>
    </div>

    <div class="total">
        <div class="left">
            <h4>总计(不含运费):</h4>
            <span>已经选择商品 {{ total }} 件，共计￥{{ price }}元</span>
        </div>
        <div class="right">
            <button  class="mui-btn mui-btn-danger">去结算</button>
        </div>
    </div>
</div>
</template>
<script>
    import number from '../home/goods/number.vue'
    import { getData,delgoods,update } from '../common/localstorageHple'
    import vueObj from '../common/communication'
    export default {
        components:{
            number
        },
        data() {
            return {
              select:[],
              goods:[],
              price:0,
              count:0,
              total:0
            }
        },
        watch:{
          'select':function(){
            let price = 0
            let total = 0
            this.select.forEach((item,index) => {
              if(item){
                price = this.goods[index].count*this.goods[index].sell_price
                total += this.goods[index].count
              }
            })
            this.total = total
            this.price = price
          }
        },
        created(){
          this.getBuyGoods()
        },
        methods:{
          getcount(obj){
            let num = obj.type == 'add' ? 1 : -1
            update({id:obj.id,count:num})
            vueObj.$emit('update')
            console.log(num)
            let data = getData()
            this.goods.sort((item1,item2)=>{
              return item1.id>item2.id
            })
            data.sort(function(item1,item2){
              return item1.id>item2.id
            })
            let price = 0
            this.goods.forEach(function(item,index){
              item['count'] = data[index].count
            })
            this.select.forEach((item,index) => {
              if(item){
                price = this.goods[index].count*this.goods[index].sell_price
              }
            })
            this.price = price
          },
          getBuyGoods(){
            let goods = getData()
            let goodsid = []
            let count = 0
            goods.forEach((item) => {
              goodsid.push(item.id)
              this.select.push(false)
              count += item.count
            })
            this.$http
              .get('/api/goods/getshopcarlist/'+goodsid.join(','))
              .then((res) => {
                console.log(res)
                if(res.status == 200 && res.data.status == 0){
                  this.goods = res.data.message
                  this.goods.sort((item1,item2)=>{
                    return item1.id>item2.id
                  })
                  goods.sort(function(item1,item2){
                    return item1.id>item2.id
                  })
                  this.goods.forEach(function(item,index){
                    item['count'] = goods[index].count
                  })
                  console.log(this.goods)
                }
              })
            .catch((err) => {
              console.error(err)
            })
          }
        }
    }
</script>
<style scoped>
.mui-bar-tab ~ .mui-content {
  padding-bottom: 0;
  background-color: #fff;
}
.total {
  display: flex;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: rgba(92, 92, 92, 0.2);
  justify-content: space-between;
  height: 70px;
}

.total h4 {
  font-weight: bold;
  font-family: '微软雅黑';
}

.total span {
  margin-top: 10px;
  font-size: 14px;
}

.total .right {
  margin-top: 8px;
}

.row {
  display: flex;
  border-bottom: 1px solid rgba(1, 1, 1, 0.3);
  padding: 10px 5px;
}

.row .left {
  /*flex: 0, 0, auto;*/
  padding-top: 20px;
}

.row .center {
  /*flex: 0, 0, auto;*/
  margin-left: 5px;
}

.row .right {
  /*flex: 1;*/
  margin-left: 5px;
}

.row .right h4 {
  color: #0094ff;
  font-size: 16px;
  padding: 5px 0px;
}

.row .right .num {
  display: inline-block;
  margin-left: 5px;
}

.row .right span {
  color: red;
  font-size: 20px;
}

.row .right a {
  color: gray;
  font-size: 14px;
  margin-left: 5px;
}
</style>