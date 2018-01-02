<template>
  <div class="wrap">
    <slider :allClass="allClass">z</slider>
    <div class="content_wrapper">
      <div class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
//  import {scroll} from 'common/js/scroll'

  import Slider from 'components/slider/slider'
  export default {
    props: {},
    data () {
      return {
        allClass: [
          {
            title: '信息初审',
            logo: 'iconfont icon-chakan',
            toggle_logo: 'icon-navigate_next',
            path: '/workbench/info',
            isS: false
          },
          {
            title: '通知通告',
            logo: 'iconfont icon-shengyin',
            toggle_logo: 'icon-navigate_next',
            path: '/workbench/notice',
            isS: false
          },
          {
            title: '我的待办',
            logo: 'iconfont icon-gou',
            toggle_logo: 'icon-navigate_next',
            path: '/workbench/todo',
            isS: true
          }
        ]
      }
    },
    created () {
//      scroll(0, 0)
//      this.bus.$emit('event', 'hello')
    },
    methods: {},
    components: {
      Slider
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .wrap
    overflow hidden
    .content_wrapper
      overflow hidden
      padding 90px 0 0 0
      background $color-background-d
      .content
        width 100%
        margin 0 auto
        border 1px dotted #3b5998

</style>
