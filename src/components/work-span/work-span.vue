<template>
  <li class="item float_left clearfix multi" :style='{width: item.percentage}'>
      <span class="left float_left">
        <span class="name float_left">{{item.display_name}}{{updateData()}}</span>
        <span v-if="item.isRequired" class="red float_left">*</span>
      </span>
    <span class="right float_left" :class="{danger:item.danger}">{{item.field_value}}</span>
  </li>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['item'],
    data() {
      return {}
    },
    computed: {
      back_item() {
        return this.item
      }
    },
    methods: {
      updateData() {
        // 将后台获取的数据格式原样返回
        console.log('hhhhh');
        this.$emit('changeData', this.back_item)
      }
    },
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .item
    line-height 49px
    overflow hidden
    width 100%
    color $color-text-d
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    &.multi
      height inherit
      .right
        line-height 1.6
        padding 13px 0
    .left
      width 100px
      margin-right 15px
    .right
      width calc(100% - 115px)
    .red
      color #FF3357
      margin-top 5px
      margin-bottom -5px
      font-size 24px
</style>
