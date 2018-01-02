<template>
  <div>
    <div class="top"></div>
    <div class="menus center">
      <a class="menu float_left" href="#/center" @click="hideDetail">入口</a>
      <a class="menu float_left" href="#/workbench/todo">首页</a>
    </div>
    <div class="box_wrapper" v-scroll ref="wrapper">
      <router-link to="/center/hot">
        <div class="inner pointer box1" @click="showDetail"
             :class='{first: index==0,second_left: index==1,third_left: index==2, third_right: index==3, second_right: index==4}'
        >
        </div>
      </router-link>
      <router-link to="/center/track">
        <div class="inner pointer box2" @click="showDetail"
             :class='{first: index==4,second_left: index==0,third_left: index==1, third_right: index==2, second_right: index==3}'
        >
        </div>
      </router-link>
      <router-link to="/center/storage">
        <div class="inner pointer box3" @click="showDetail"
             :class='{first: index==1,second_left: index==2,third_left: index==3, third_right: index==4, second_right: index==0}'
        >
        </div>
      </router-link>
      <router-link to="/center/distribution">
        <div class="inner pointer box4" @click="showDetail"
             :class='{first: index==3,second_left: index==4,third_left: index==0, third_right: index==1, second_right: index==2}'
        >
        </div>
      </router-link>
      <router-link to="/center/work">
        <div class="inner pointer box5" @click="showDetail"
             :class='{first: index==2,second_left: index==3,third_left: index==4, third_right: index==0, second_right: index==1}'
        >
        </div>
      </router-link>
      <div class="mask1"></div>
      <div class="mask2"></div>
    </div>
    <transition name="slide">
      <div class="detail" v-show="$route.path !== '/center'">
        <router-view></router-view>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {},
    data () {
      return {
        index: 0,
        isMove: false,
        isShow: false
      }
    },
    created () {
//      this.bus.$on('event', msg => {
//        console.log(msg)
//      })
    },
    methods: {
      // 更改index
      _changeScale (isUp) {
        if (this.isMove) return
        if (isUp) {
          this.isMove = true
          if (this.index === 0) this.index = 5
          this.index--
          setTimeout(() => {
            this.isMove = false
          }, 800)
        } else {
          this.isMove = true
          if (this.index === 4) this.index = -1
          this.index++
          setTimeout(() => {
            this.isMove = false
          }, 800)
        }
//        console.log(this)
      },
      // 定义绑定事件监听函数
      _bind (obj, str, fun) {
        if (obj.addEventListener) {
          obj.addEventListener(str, fun, false)
        } else {
          // 兼容ie
          obj.attachEvent('on' + str, fun.call(obj))
        }
      },
      showDetail () {
        this.isShow = true
      },
      hideDetail () {
        this.isShow = false
      }
    },
    computed: {},
    directives: {
      scroll: (el, binding, vnode) => {
        let vm = vnode.context
        el.onmousewheel = function (event) {
          event = event || window.event
          // 向上滚
          if (event.wheelDelta > 0 || event.detail < 0) {
            vm._changeScale(true)
          } else {
            // 向下滚
            vm._changeScale(false)
          }
          // 取消默认行为。
          event.preventDefault && event.preventDefault()
          return false
        }
        // 兼容火狐
        vm._bind(el, 'DOMMouseScroll', el.onmousewheel)
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  @import "~common/stylus/variable.styl"

  .top
    height 71px
    width 100%
    position absolute
    top 0
    z-index 12
    background url(top.png) center / cover

  .menus
    position absolute
    top 30px
    right 40px
    height 39px
    line-height 39px
    text-indent -9999px
    width 292px
    z-index 14
    .menu
      width 50%
      &:first-child
        background url(menu.png) 0 0
        &:hover
          background url(menu.png) 0 39px
      &:last-child
        background url(menu.png) right top
        &:hover
          background url(menu.png) right 39px

  .box_wrapper
    width 100%
    height 100vh
    margin 0 auto
    position relative
    overflow hidden
    z-index 11
    background url(bg.jpg) center center / cover
    .inner
      background url(img01.png) center top / cover
      &.box2
        background url("img02.png") center top / cover
      &.box3
        background url("img03.png") center top / cover
      &.box4
        background url("img04.png") center top / cover
      &.box5
        background url("img05.png") center top / cover
      &.first
        height 500px
        width 620px
        position absolute
        left 50%
        right 50%
        margin-left -310px
        top 65%
        margin-top -310px
        z-index 10
        transition all .8s
        font-size 42px
        line-height 500px
      &.second_left, &.second_right
        height 320px
        width 384px
        position absolute
        top 30%
        transition all .8s
        font-size 32px
        line-height 300px
        z-index 3
      &.second_left
        left 1%
        transition all .8s
        right calc(99% - 384px)
      &.second_right
        right 1%
        transition all .8s
        left calc(99% - 384px)
      &.third_left, &.third_right
        height 206px
        width 248px
        position absolute
        top 11%
        transition all .8s
        line-height 206px
        z-index 1
      &.third_left
        left 25%
        right calc(75% - 248px)
        transition all .8s
      &.third_right
        right 25%
        left calc(75% - 248px)
        transition all .8s
    .mask1, .mask2
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      background rgba(0, 0, 0, .1)
    .mask1
      z-index 4
    .mask2
      z-index 2

  .detail
    position fixed
    top 0
    height 100%
    width 100%
    transform-style preserve-3d
    background url("../../../common/img/bg2.png") center / cover
    z-index 13
    &.slide-enter-active, &.slide-leave-active
      transition all .8s
    &.slide-enter, &.slide-leave-active
      transform translate3d(100vw, 0, 0)

  @media screen and (max-width 1366px)
    .menus
      top 32px
      right 20px
      width 220px
      height 29.4px
      line-height 29.4px
      .menu
        &:first-child
          background url(menu.png) 0 0 / 220px
          &:hover
            background url(menu.png) 0 29.4px / 220px
        &:last-child
          background url(menu.png) right top / 220px
          &:hover
            background url(menu.png) right 29.4px / 220px

    .box_wrapper
      .inner
        &.first
          height 420px
          width 504px
          margin-left -252px
          top 70%
          margin-top -252px
          line-height 420px
        &.second_left, &.second_right
          height 280px
          width 336px
          line-height 280px
        &.second_left
          right calc(99% - 336px)
        &.second_right
          left calc(99% - 336px)
        &.third_left, &.third_right
          top 12%
          height 180px
          width 216px
          line-height 180px
        &.third_left
          left 26%
          right calc(74% - 216px)
        &.third_right
          right 26%
          left calc(74% - 216px)
</style>
