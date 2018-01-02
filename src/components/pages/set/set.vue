<template>
  <div class="wrap">
    <div class="middle clearfix">
      <div class="title float_left">系统设置</div>
      <div class="p float_left">
        <position :p_arr="p_arr"></position>
      </div>
    </div>
    <slider v-on:updateP="updateP"></slider>
    <div class="content_wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import {scroll} from 'common/js/scroll'

  import Position from 'components/position/position'
  import Slider from 'components/setting-slider/setting-slider'

  export default {
    data () {
      return {
        p_arr: ['系统设置', '班次管理']
      }
    },
    created() {
//      scroll(0, 0)
    },
    methods: {
      updateP (val) {
        this.p_arr = val
      }
    },
    components: {
      Position,
      Slider
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  .wrap
    overflow hidden
    padding-top 90px
    background $color-background-d
    font-family 'Microsoft YaHei'
    .middle
      height 70px
      border-bottom 1px solid #E0E0E0
      box-sizing border-box
      position fixed
      z-index 20
      min-width 1280px
      background #fff
      top 90px
      left 0
      right 0
      .title
        line-height 70px
        color $color-text-ll
        font-size 24px
        padding 0 90px
      .p
        line-height 70px
    .content_wrapper
      padding 80px 60px 40px 60px
      overflow hidden
</style>
