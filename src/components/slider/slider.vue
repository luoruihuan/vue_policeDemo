<template>
  <div class="slider_wrapper float_left" :class="{back:isBack}">
    <div class="slider" :class="{back:isBack}">
      <transition name="slider-fade">
        <ul class="slider_content" v-show="!isBack">
          <router-link tag="li" v-for="(item, index) in allClass" :to="item.path" :key="index" class="menu_item pointer">
            <span class="icon logo" :class="item.logo"></span>
            <span class="icon title">{{item.title}}</span>
            <span class="icon toggle_logo float_right" :class="item.toggle_logo"></span>
          </router-link>
        </ul>
      </transition>
      <div v-on:click="backMenu" class="toggle_menu pointer"><span class="iconfont" :class="{'icon-shuangjiantouxia4':isBack, 'icon-shuangjiantouxia3': !isBack}"></span></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['allClass'],
    data () {
      return {
        isBack: false
      }
    },
    methods: {
      // 使菜单显示或隐藏
      backMenu () {
        this.isBack = !this.isBack
      }
    },
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

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
          &.router-link-active, &:hover
            background #5985cd
            padding-left 20px
            border-left 6px solid transparent
          &.router-link-active
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
</style>
