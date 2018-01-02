<template>
  <div class="wrap">
    <div class="slider_wrapper float_left" :class="{back:isBack}">
      <div class="slider" :class="{back:isBack}">
        <transition name="slider-fade">
          <ul class="slider_content" v-show="!isBack">
            <router-link tag="div" v-for="(item, index) in allClass" :to="item.path" :key="index"
                         class="menu_item pointer" :class="{hasC: index == 0}">
              <li @click="changTopC_Index($event, index)">
                <span class="icon logo" :class="item.logo"></span>
                <span class="icon title">{{item.title}}</span>
                <span class="icon toggle_logo float_right" :class="item.toggle_logo"></span>
                <transition name="slide-fade" v-if="index == 0">
                  <ul class="menu_item_detail" v-show="showLevel3">
                    <router-link :to="menu.path" :key="index" tag="li"
                                 v-for="(menu,index) in menus"
                                 class="item"
                    >
                      {{menu.title}}
                    </router-link>
                  </ul>
                </transition>
              </li>
            </router-link>
          </ul>
        </transition>
        <div v-on:click="backMenu" class="toggle_menu pointer">
          <span class="iconfont" :class="{'icon-shuangjiantouxia4':isBack, 'icon-shuangjiantouxia3': !isBack}"></span>
        </div>
      </div>
    </div>
    <div class="content_wrapper">
      <div class="content">
        <router-view :org="org"></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import {scroll} from 'common/js/scroll'
  import {fullPathInclude} from 'common/js/logic'
  export default {
    props: {},
    data () {
      return {
        allClass: [
          {
            title: '信息报送',
            logo: 'iconfont icon-iconfontyouxiang',
            toggle_logo: 'iconfont icon-xiangyoujiantou-copy',
            path: '/management/submission',
            isS: true
          },
          {
            title: '处置任务',
            logo: 'iconfont icon-dianshi',
            toggle_logo: 'iconfont icon-xiangyoujiantou-copy',
            path: '/management/task',
            isS: false
          },
          {
            title: '舆情录入',
            logo: 'iconfont icon-jilu',
            toggle_logo: 'iconfont icon-xiangyoujiantou-copy',
            path: '/management/entering',
            isS: false
          }
        ],
        menus: [
          {
            title: '91信息',
            path: '/management/submission/91info'
          },
          {
            title: '市局上报',
            path: '/management/submission/cityreport'
          },
          {
            title: '分局上报',
            path: '/management/submission/countyreport'
          },
          {
            title: '上报省厅',
            path: '/management/submission/reportprovince'
          },
          {
            title: '上报市局',
            path: '/management/submission/reportcity'
          }
        ],
        isBack: false,
        subC: 0
      }
    },
    created () {
//      scroll(0, 0)
//      this.bus.$emit('event', 'hello')
      this._initLogo()
    },
    methods: {
      backMenu () {
        this.isBack = !this.isBack
      },
      changTopC_Index (e, index) {
        this.allClass[0].toggle_logo = 'iconfont icon-xiangyoujiantou-copy'
        if (index == 0) {
          this.allClass[0].toggle_logo = 'iconfont icon-more_unfold'
        }
      },
      _initLogo () {
        if (fullPathInclude(this, '/management/submission')) {
          this.allClass[0].toggle_logo = 'iconfont icon-more_unfold'
        }
      }
    },
    computed: {
      showLevel3 () {
        return fullPathInclude(this, '/management/submission')
      },
      // 获取position
      org () {
        if (fullPathInclude(this, 'cityreport')) return '市局上报'
        if (fullPathInclude(this, 'countyreport')) return '分局上报'
        if (fullPathInclude(this, 'reportprovince')) return '上报省厅'
        if (fullPathInclude(this, 'reportcity')) return '上报市局'
      }
    },
    components: {}
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
            padding-left 26px
            .icon
              display inline-block
              font-size $font-size-medium-x
              line-height 55px
              &.logo
                width 30px
              &.toggle_logo
                font-size $font-size-large-x
                padding-right 20px
            &.router-link-active
              background #5985cd
              padding-left 20px
              border-left 6px solid #ff9900
              &.hasC
                border-left 6px solid transparent
            &:hover
              background #5985cd
            .menu_item_detail
              width 220px
              position relative
              height 225px
              left -26px
              overflow hidden
              &.slide-fade-enter-active
                transition all .8s
              &.slide-fade-leave-active
                transition all .8s
              &.slide-fade-enter, &.slide-fade-leave-active
                height 0 !important
                opacity 0
              .item
                font 14px '宋体'
                padding-left 60px
                width 220px
                line-height 45px
                height 45px
                background #39465B
                box-sizing border-box
                cursor pointer
                span
                  padding-right 20px
                  float right
                &:hover
                  background #4D596C
                  &:before
                    background transparent
                &.router-link-active
                  background #4D596C
                  &:before
                    content ''
                    display inline-block
                    height 45px
                    width 6px
                    background #ff9900
                    position absolute
                    left 0
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
        border 1px dotted #3b5998
</style>
