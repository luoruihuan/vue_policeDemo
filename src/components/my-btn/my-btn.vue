<template>
  <li class="item">
    <input @click="close" type="button" class="float_right btn center pointer mr10" value="取消">
    <input @click="post" type="button" class="float_right btn center pointer" value="提交">
  </li>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['item'],
    data () {
      return {
        modal: false,
      }
    },
    created() {
    },
    methods: {
      close () {
        this.$emit('hideModal')
      },
      post () {
        this.$emit('hideModal')
        this.$emit('sendData')
      }
    },
    components: {
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .item
    line-height 49px
    overflow hidden
    font-size 14px
    border-bottom 1px solid #f4f4f4
    height 70px
    position absolute
    bottom 0
    left 0
    right 0
    border-radius 0 0 8px 8px / 0 0 8px 8px
    box-sizing content-box
    background #eef3fb
    .center
      text-align center
    .mr10
      margin-right 10px
    .btn
      background $color-sub-theme
      line-height 30px
      height 30px
      width 80px
      border-radius 4px
      color $color-text
      margin-top 20px
      margin-left 5px
      &:hover
        background #5276C3
      &.close
        background #CFD9E9
        color $color-text-d
        &:hover
          background #cad3e3
</style>
