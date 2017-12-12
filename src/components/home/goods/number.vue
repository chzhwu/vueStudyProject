<template>
  <div class="number">
      <input @click="sub" class="left" type="button" value="-"><input type="text" class="nm" v-model="num"><input @click="add" type="button" class="right" value="+">
  </div>
</template>
<script>
export default {
    data(){
        return {num:this.number||1,type:''}
    },
    props:['stock','number','id'],
    methods:{
        add(){
            if(this.num>=this.stock){
                return
            }
            this.num++
            this.type = 'add'
            this.getnum()
        },
        sub(){
            if(this.num<=1){
                return
            }
            this.num--
            this.type = 'sub'
            this.getnum()
        },
        getnum(){
            this.$emit('buynum',this.num)
            this.$emit('getcount',{id:this.id,count:this.num,type:this.type})
        }
    }
}
</script>
<style scoped>
    .number{
        text-align: center;
        display:inline-block;
    }
    .left,.right{
        padding:0;
        margin:0;
        width:30px;
        height: 30px;
        line-height:30px;
        border:1px solid #ccc;
        border-radius:0;
    }
    .nm{
        margin:0;
        padding:0;
        width:30px;
        height: 30px;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
        border-radius:0;
        text-align:center;
    }
</style>
