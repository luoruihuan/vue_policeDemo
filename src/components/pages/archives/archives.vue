<template>
  <div class="wrap">
    <slider :allClass="allClass"></slider>
    <div class="content_wrapper">
      <div class="content">
        <router-view></router-view>
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
            title: '网站类台账',
            logo: 'iconfont icon-chakan',
            toggle_logo: 'icon-navigate_next',
            path: '/archives/website-ledger',
            isS: true
          },
          {
            title: '重点组织台账',
            logo: 'iconfont icon-shengyin',
            toggle_logo: 'icon-navigate_next',
            path: '/archives/texture-ledger',
            isS: false
          },
          {
            title: '重点人台账',
            logo: 'iconfont icon-gou',
            toggle_logo: 'icon-navigate_next',
            path: '/archives/people-ledger',
            isS: false
          },
          {
            title: '重要网上事件台账',
            logo: 'iconfont icon-shengyin',
            toggle_logo: 'icon-navigate_next',
            path: '/archives/online-ledger',
            isS: false
          },
          {
            title: '涉恐账号台账',
            logo: 'iconfont icon-shengyin',
            toggle_logo: 'icon-navigate_next',
            path: '/archives/terror-ledger',
            isS: false
          }
        ],
//        isBack: false
      }
    },
    created () {
//      scroll(0, 0)
//      this.bus.$emit('event', 'hello')
    },
    methods: {
      backMenu () {
        this.isBack = !this.isBack
      }
    },
    components: {
        Slider
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .wrap
    overflow hidden
    .slider_wrapper
      width 220px
      height calc(100vh - 90px)
      transition width .8s
      &.back
        width 10px
      .slider
        width 220px
        height 100vh
        position fixed
        background $color-theme
        top 90px
        z-index 20
        transition width .8s
        &.back
          width 10px
        .slider_content
          font-size 0
          overflow hidden
          &.slider-fade-enter-active, &.slider-fade-leave-active
            transition all .8s
          &.slider-fade-enter, &.slider-fade-leave-active
            opacity 0
          .menu_item
            color $color-text
            width 220px
            padding-left 30px
            .icon
              display inline-block
              font-size $font-size-medium-x
              line-height 55px
              &.logo
                width 30px
              &.toggle_logo
                font-size $font-size-large-x
                padding-right 20px
            &.router-link-active, &:hover
              background #5985cd
              padding-left 20px
              border-left 6px solid #ff9900
        .toggle_menu
          position absolute
          right -28px
          top 50%
          z-index 20
          margin-top -100px
          height 130px
          border 14px solid transparent
          border-left 14px solid $color-sub-theme
          span
            position absolute
            left -16px
            top -12px
            color $color-text
            font-size $font-size-medium-x
            line-height 130px
    .content_wrapper
      overflow hidden
      padding 90px 0 0 0
      background $color-background-d
      .content
        width 100%
        margin 0 auto
</style>
