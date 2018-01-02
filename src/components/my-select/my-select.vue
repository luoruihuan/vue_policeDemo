<template>
  <li class="item float_left clearfix" :style='{width: item.percentage}'>
    <span class="float_left">
      <span class="left float_left">
        <span class="name float_left">{{item.display_name || item.name}}</span>
        <span class="red float_left" v-if="item.isRequired">*</span>
      </span>
      <span v-show="false" class="item-tit-right float_left">{{item.value}}</span>
      <select v-model="back_item.new_value" class="float_left text w232" @change="updateData($event, item)" :name="item.name">
        <option value="">请选择</option>
        <!--selects应该是向后台请求的数据-->
        <option v-for="o in item.selects" :value="o">{{o}}</option>
      </select>
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
      back_item() {
        return this.item
      }
    },
    methods: {
      updateData(e, i) {
/*        let data = {
          name: i.name,
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
    height 50px
    line-height 49px
    width 100%
    overflow hidden
    color $color-text-d
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    .text
      height 38px
      border(#ABADB3)
      padding-left 6px
      margin-right 5px
      box-shadow 0 3px 5px 0 #e0e0e0 inset
      margin-top 6px
    .i
      width 50%
    .left
      width 100px
      margin-right 15px
    .red
      color #FF3357
      margin-top 5px
      margin-bottom -5px
      /*line-height 60px*/
      font-size 24px
    .w600
      width 600px
    .w232
      width 232px
</style>
