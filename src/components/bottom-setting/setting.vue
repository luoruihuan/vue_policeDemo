<template>
    <div class="to_top_wrapper">
      <ul>
        <li class="iconfont icon-set" @click="setting"></li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      setting () {
        // chrome
        let d = document.body
        // firefox
        let f = document.documentElement
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .to_top_wrapper
    width 60px
    position fixed
    right 10px
    bottom 30px
    z-index 200
    li
      font-size 30px
      height 60px
      display block
      width 100%
      line-height 60px
      color #fff
      background #85C2F1
      margin-bottom 5px
      text-align center
      cursor pointer
      &:last-child
        position relative
        margin-bottom 0

</style>
