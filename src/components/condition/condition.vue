<template>
  <div class="condition_wrapper">
    <table class="conditions">
      <slot v-for="i in 20" :name="'row' + i"></slot>
    </table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {},
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .condition_wrapper
    padding-bottom 25px
    box-shadow 0 5px 10px 0 #DCDCDC
    position relative
    z-index 1
    .conditions
      width calc(100% - 40px)
      text-align center
      line-height 42px
      margin 0 20px
      color $color-text-ll
      font-size $font-size-medium
      .one, .three
        width 9%
        color $color-text-d
        background #F5F5F5
        border 1px solid #EEEEEE
      .two, .four
        width 41%
        border 1px solid #EEEEEE
        text-align left
        padding-left 6px
        .type
          border 1px solid #AAAAAA
          display inline-block
          line-height 34px
          margin-right 3px
          padding 0 16px
          .iconfont
            font-size $font-size-medium
          &.blue
            color #5587d7
            background #E2EDFF
            border 1px solid #5587d7
        .company, .keywords
          width 30%
          line-height 34px
          height 34px
          border 1px solid #AAAAAA
          color $color-text-ll
          padding-left 6px
        .keywords
          line-height 36px
          height 36px
</style>
