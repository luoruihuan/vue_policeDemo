<template>
  <li class="item float_left clearfix" :style='{width: item.percentage}'>
    <span class="name float_left left">{{item.name}}</span>
    <div class="float_left add pointer">{{item.value}}
    <input :type="item.btn_type" :name="item.btn_type=='file'?(item.btn_type):''" @change="updateData"
           class="file pointer"></div>

  </li>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['item'],
    data () {
      return {}
    },
    created () {
      console.log(this.item)
    },
    computed: {
      back_item () {
        return this.item
      }
    },
    methods: {
      updateData(e) {
        e = e || window.event
//        if(this.item.btn_type==='file') {
//          let data = {
//            name: this.item.name,
//            val: e.target.value
//          }
//          this.$emit('changeData', data)
//        }
        this.back_item.new_value = e.target.value
        this.$emit('changeData', this.back_item)
      },
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
    overflow hidden
    color $color-text-d
    font-size $font-size-medium
    width 100%
    border-bottom 1px solid #F4F4F4
    .i
      width 50%
    .left
      width 100px
      margin-right 15px
    .red
      color #FF3357
      line-height 60px
      font-size 24px
    .w600
      width 600px
    .w232
      width 232px
    .add
      height 38px
      line-height 36px
      color $color-text
      font-size $font-size-medium
      background #89BAF0
      position relative
      margin-top 6px
      padding 0 12px
      border(#70A1D8)
      overflow hidden
      &:hover
        background #7EABE1
      .file
        position absolute
        top 0
        left 0
        zoom 1
        opacity 0
        margin-left -240px
        font-size 30px
</style>
