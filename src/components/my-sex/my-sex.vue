<template>
  <li class="item float_left clearfix" :style='{width: item.percentage}'>
    <span class="float_left content">
      <span class="left float_left">
        <span class="name float_left">{{item.name}}</span>
        <span class="red float_left" v-if="item.isRequired">*</span>
      </span>
      <span :class="{'w600':item.percentage==='100%', 'w232':item.percentage==='50%'}">
        <input type="radio" name="sex" :name="item.name" @click="updateData">&nbsp;&nbsp;男
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="radio" name="sex" :name="item.name" @click="updateData">&nbsp;&nbsp;女
      </span>
    </span>
  </li>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['item'],
    data () {
      return {}
    },
    computed: {
      myLine () {

      }
    },
    methods: {
      updateData(e) {
        let data = {
          name: this.item.name,
          val: e.target.value
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
    border-bottom 1px solid #F4F4F4
    .content
      width 100%
    .text
      height 38px
      border(#ABADB3)
      padding-left 6px
      box-shadow 0 3px 5px 0 #e0e0e0 inset
      margin-top 6px
    .left
      width 100px
      margin-right 15px
    .red
      color #FF3357
      line-height 60px
      font-size 24px
    .w600
      width 566px
    .w232
      width 232px
</style>
