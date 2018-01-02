<template>
  <div class="div">
    <li class="item float_left clearfix" v-show="index==0" v-for="(k,index) in item.lists_arr" :style='{width: item.percentage}'>
      <select name=""  class="select float_left" v-model="hostlocation"  style="color: #757575;">
        <option v-for="k in optionss" :selected="index==0">{{k}}</option>
      </select>
      <input type="text"  class="text float_left" placeholder="ID/主页地址" v-model="net">
      <span class="float_left pointer" @click="add_Reduce($event,k,index)" :class="k.isSave?'btn_save':'add_Reduce'">{{k.operation}}</span>
    </li>
    <li class="item float_left clearfix" v-show="index!=0&&k.isSave==false" v-for="(k,index) in item.lists_arr" :style='{width: item.percentage}'>
      <select name=""  class="select float_left" style="color: #757575;">
        <option v-for="i in optionss" :selected="i==k.selected">{{i}}</option>
      </select>
      <input type="text"  class="text float_left" placeholder="ID/主页地址" v-model="k.hostlocation">
      <span class="float_left pointer" @click="add_Reduce($event,k,index)" :class="k.isSave?'btn_save':'add_Reduce'">{{k.operation}}</span>
    </li>

    <li class="item float_left clearfix" v-show="index!=0&&k.isSave==true" v-for="(k,index) in item.lists_arr" :style='{width: item.percentage}'>
      <span class="span_left float_left">
        {{k.selected}}:
      </span>
      <span class="span_right float_left">
        {{k.hostlocation}}
      </span>
    </li>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['item'],
    data () {
      return {
        index:999,
        optionss:["请选择","新浪微博","腾讯微博","天涯社区","百度贴吧"],
        hostlocation:'请选择',
        net:'',
      }
    },
    computed: {
      myLine () {
      }
    },
    methods: {
      add_Reduce(e,i,index){
        if(i.operation == '+'){
          if(this.net!=''&&this.hostlocation!=''){
            this.item.lists_arr.push({hostlocation:this.net,isSave:false,operation:'-',selected:this.hostlocation})
            this.net = ''
            this.hostlocation = '请选择'
          }else{
            alert('请填写完整，不能为空！')
          }
        }else if(i.operation == '-'){
          this.item.lists_arr.splice(index,1)
        }else if(i.operation == '保存'){
          console.log('保存')
          if(this.net!=''&&this.hostlocation!=''){
            this.item.lists_arr.push({hostlocation:this.net,isSave:true,operation:'-',selected:this.hostlocation})
            this.net = ''
            this.hostlocation = '请选择'
          }else{
            alert('请填写完整，不能为空！')
          }
        }
        console.log(i)
        let data = {
          name: this.item.name,
          val: this.item.lists_arr
        }
        this.$emit('changeData', data)
      }
    },
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .item
    height 50px
    line-height 49px
    width 100%
    color $color-text-d
    font-size $font-size-medium
    padding-top 6px
    border-bottom 1px solid #F4F4F4
    .select
      height 38px
      width: 118px
      box-shadow 0 3px 5px 0 #e0e0e0 inset
      color #000
      padding-left 10px
      background-color: #fbfbfb;
      border(#ABADB3)
    .text
      width: 640px
      height 38px
      border(#ABADB3)
      padding-left 6px
      margin 0px 6px
      background-color: #fbfbfb;
      box-shadow 0 3px 5px 0 #e0e0e0 inset
    .add_Reduce
      width: 38px
      height: 38px
      border(#70A1D8)
      font-weight bold
      text-align center
      line-height: 38px
      color #70A1D8
    .span_left
      width: 14%
      margin-top -6px
    .span_right
      width: 14%
      margin-top -6px
    .btn_save
      width: 58px
      height: 38px
      text-align center
      line-height: 38px
      border(#6C99D3)
      color: #ffffff
      background-color: #70A1D8;

</style>
