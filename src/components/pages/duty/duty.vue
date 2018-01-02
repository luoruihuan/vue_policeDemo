<template>
  <div class="content_wrapper">
    <Slider :allClass="allClass"></Slider>
    <div class="content">
        <router-view></router-view>
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
            title: '值班管理',
            logo: 'iconfont icon-chakan',
            toggle_logo: 'icon-navigate_next',
            path: '/duty/workmanage',
            isS: false
          },
          {
            title: '值班日志',
            logo: 'iconfont icon-shengyin',
            toggle_logo: 'icon-navigate_next',
            path: '/duty/worknote',
            isS: false
          }
        ]
      }
    },
    created() {
//      scroll(0, 0)
    },
    methods: {},
    components: {Slider}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .content_wrapper
    padding 90px 0 0 0
    .content
      width 100%
      min-height 100vh
      margin 0 auto

</style>
