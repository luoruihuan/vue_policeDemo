<template>
  <!--:class="{'multi': item.isMulti}"-->
  <li class="item float_left clearfix multi" :style='{width: item.percentage}'>
      <span class="left float_left">
        <span class="name float_left">{{item.display_name || item.name}}{{updateData()}}</span>
        <span v-if="item.isRequired" class="red float_left">*</span>
      </span>
    <span class="right float_left" :class="{danger:item.danger}" v-if="typeof  item.value!= 'object'">{{item.value }}</span>
    <span class="right float_left" :class="{danger:item.danger}" v-if="item.value instanceof Array">
      <span v-if="item.value[0].peopleName" v-for="(v, i) in item.value" :key="i">{{v.peopleName}} <span v-if="item.value.length != i+1">、</span> </span>
      <span v-if="item.value[0].siteDomain" v-for="(v, i) in item.value" :key="i">{{v.siteDomain}}<span v-if="item.value.length != i+1">、</span> </span>
    </span>
    <input type="hidden" :value="item.value" v-if="item.value" :name="item.name">

  </li>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['item'],
    data () {
      return {}
    },
    created () {
      this.updateData()
    },
    computed: {
      back_item() {
        return this.item
      }
    },
    methods: {
      updateData() {
//        let data = {
//          name: this.item.name,
//          val: this.item.value
//        }
//        console.log(data)
//        this.$emit('changeData', this.back_item)
//        console.log(123)
//        console.log(this.back_item)
       // this.$emit('changeData', this.back_item)
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
    /*height 50px*/
    color $color-text-d
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    &.multi
      height inherit
      .right
        line-height 1.6
        padding 13px 0
    .i
      width 50%
    .left
      width 100px
      margin-right 15px
    .right
      width calc(100% - 115px)
    .danger
      font-size 16px
      font-family "Microsoft YaHei"
      font-weight bold
      color #ee0000
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
