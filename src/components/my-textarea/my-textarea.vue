<template>
  <li class="item clearfix float_left" :style='{width: item.percentage}'>
    <span class="left float_left">
      <!--item.display_name || item.name 显示档案资料的值或者显示工作流的值-->
      <span class="name float_left">{{item.display_name || item.name}}</span>
      <span v-if="item.isRequired" class="red float_left">*</span>
    </span>
    <!--v-model="item.new_value" 将用户输入的值绑定到item-->
    <textarea v-model="back_item.new_value" :name="item.name" @blur="updateData($event)" class="float_left w600 multi_text"
              cols="30" rows="5" placeholder="请输入" ></textarea>
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
      updateData(e) {
        /*let data = {
          name: this.item._name,
          val: e.target.value
        }*/
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
    color $color-text-d
    width 100%
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    height inherit
    .left
      width 100px
      margin-right 15px
    .red
      color #FF3357
      margin-top 5px
      margin-bottom -5px
      /*line-height 60px*/
      font-size 24px
    .multi_text
      border(#ABADB3)
      margin 6px 0
      resize none
      padding 6px
      box-shadow 0 3px 5px 0 #e0e0e0 inset
    .w600
      width 693px
      height 166px
    .w232
      width 232px
</style>
