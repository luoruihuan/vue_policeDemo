<template>
  <li class="item float_left clearfix" :style='{width: item.percentage}'>
    <span class="float_left content">
      <span class="left float_left">
        <span class="name float_left">{{item.display_name || item.name}}</span>
        <span class="red float_left" v-if="item.isRequired">*</span>
      </span>
      <!--<span v-show="false" class="item-tit-right float_left">{{item.value}}</span>-->
      <input
             v-model="back_item.new_value"
             @blur="updateData($event)"
             :name="item.name"
             type="text" @keyup="getReg"
             :placeholder="isNum ? num_placeholder : any_placeholder"
             class="text"
             :class="{'w600':w600, 'w232':w232}">
    </span>
  </li>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['item'],
    data() {
      return {
        isNum: false,
        num_placeholder: '请输入数字',
        any_placeholder: '请输入'
      }
    },
    computed: {
      w600() {
        return this.item.percentage === '100%' || this.item.cpt_type === 2
      },
      w232() {
        return this.item.percentage === '50%' || this.item.cpt_type === 1
      },
      back_item() {
        return this.item
      }
    },
    created() {
      if (this.item.type == 0) {
        //数字
        this.isNum = true
//        1
      }
    },
    methods: {
      updateData(e) {
        this.$emit('changeData', this.back_item)
      },
      getReg(e) {
        e = e || window.event
        if (this.item.type == 0) {
          //数字
          let reg = /[^\d]*/g
          e.target.value = e.target.value.replace(reg, '')
        }
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
      /*line-height 60px*/
      margin-top 5px
      margin-bottom -5px
      font-size 24px
    .w600
      width 566px
    .w232
      width 232px
</style>
