<template>
  <li class="item float_left clearfix" :style='{width: item.percentage}'>
      {{item.name}}
  </li>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['item'],
    data () {
      return {
      }
    },
    computed: {
    },
    created () {
    },
    methods: {
    },
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .item
    width 100%
    color #5587d7
    font-size 16px
    padding 0 20px
    line-height 38px
    background #edf1fa
    box-sizing content-box
    margin-left -20px
</style>
