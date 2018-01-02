<template>
  <li class="item float_left clearfix" :style='{width: item.percentage}'>
    <span class="float_left content">
      <span class="left float_left">
        <span class="name float_left">{{item.name}}</span>
        <span class="red float_left" v-if="item.isRequired">*</span>
      </span>
      <!--<span v-show="false" class="item-tit-right float_left">{{item.value}}</span>-->
      <img class="float_left" :src="v.url" alt="" v-for="(v, i) in item.img" :key="i">
      <input type="checkbox" checked :value="v.src" :name="v.src" v-for="(v, i) in item.img" :key="i" class="zIndex">
       </span>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    props: ['item']
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .item
    /*height 50px*/
    line-height 49px
    padding-top 10px
    width 100%
    color $color-text-d
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    .zIndex
     z-index -1
     opacity 0
    img
      width 150px
      height 150px
      margin 0 15px 10px 0
    .left
      width 100px
      margin-right 25px
</style>
