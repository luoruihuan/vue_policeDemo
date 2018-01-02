<template>
  <transition name="enlarge">
    <div v-show="showTop" class="to_top_wrapper">
      <ul>
        <li class="iconfont icon-xiangshangjiantou" @click="toTop"></li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {scroll} from 'common/js/scroll'
  export default {
    data () {
      return {
        showTop: false
      }
    },
    mounted () {
      // 监听页面滚动的距离
      window.addEventListener('scroll', this._menu)
    },
    methods: {
      toTop () {
        // 滚动的目标位置与浏览器窗口顶部的距离
        let disTop = 0
        // 滚动的速度
        let speed = 10
        scroll(disTop, speed)
      },
      _menu() {
        // chrome
        this.scroll = document.body.scrollTop
        // firefox
        this.f_scroll = document.documentElement.scrollTop
        if (this.scroll > 300 || this.f_scroll > 300) {
          this.showTop = true
        } else {
          this.showTop = false
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .to_top_wrapper
    width 60px
    position fixed
    right 10px
    bottom 100px
    z-index 200
    &.enlarge-enter-active
      transition all .5s cubic-bezier(0, 1.86, .08, 1.19)
    &.enlarge-enter, &.enlarge-leave-active
      transform: scale(0) translateY(100px)
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
