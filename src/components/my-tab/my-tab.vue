<template>
  <div class="tabs clearfix">
    <div class="tab float_left">
      <slot name="left"></slot>
    </div>
    <div class="opts float_right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['tabList', 'currentTabIndex'],
    data () {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  .tabs
    color #444444
    line-height 40px
    font-size $font-size-medium-x
    .tab
      &:last-child
        padding-left 20px
      &:first-child
        padding-right 20px
      &.active
        font-size $font-size-medium-xx
        font-weight bold
    .opts
      .opt
        color $color-sub-theme
        line-height 26px
        height 28px
        padding 0 10px
        background $color-background-d
        margin-left 10px
        margin-top 6px
        border-radius 5px
        font-size $font-size-medium
        border 1px solid $color-sub-theme
</style>
