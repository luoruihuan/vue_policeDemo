<template>
  <div class="box">
    <div class="contain">
      <div class="wrap_title">
        <div class="clearfix">
          <div class=" float_left">
            <span class="pointer float_left active" @click="changeShow">业务流程</span>
            <span class="float_left ml10">|</span>
            <span class="pointer ml10 float_left" @click="changeShow">流转历史</span>
          </div>
        </div>
      </div>
      <proce-history v-on:showPubOpi="togglePubOpi" v-show="left_isSHow"></proce-history>
      <!--表单-->
      <div v-show="right_isSHow">
        <div class="history">
          <ul class="history_title clearfix">
            <li class="center one float_left">处理类型</li>
            <li class="center two float_left">处理人</li>
            <li class="center three float_left">处理时间</li>
            <li class="center four float_left">下一步办理人</li>
            <li class="center five float_left">办理意见</li>
          </ul>
          <ul class="history_title clearfix">
            <li class="center one float_left">大厦大厦多</li>
            <li class="center two float_left">处理人</li>
            <li class="center three float_left">2017.6.2</li>
            <li class="center four float_left">下一步</li>
            <li class="center five float_left">办理办理意见办理意见办理意见意见</li>
          </ul>
          <ul class="history_title clearfix">
            <li class="center one float_left">大厦大厦多</li>
            <li class="center two float_left">处理人</li>
            <li class="center three float_left">2017.6.2</li>
            <li class="center four float_left">下一步</li>
            <li class="center five float_left">办理办理意见办理意见办理意见意见</li>
          </ul>
          <ul class="history_title clearfix">
            <li class="center one float_left">大厦大厦多</li>
            <li class="center two float_left">处理人</li>
            <li class="center three float_left">2017.6.2</li>
            <li class="center four float_left">下一步</li>
            <li class="center five float_left">办理办理意见办理意见办理意见意见</li>
          </ul>
          <ul class="history_title clearfix">
            <li class="center one float_left">大厦大厦多</li>
            <li class="center two float_left">处理人</li>
            <li class="center three float_left">2017.6.2</li>
            <li class="center four float_left">下一步</li>
            <li class="center five float_left">办理办理意见办理意见办理意见意见</li>
          </ul>
          <ul class="history_title clearfix">
            <li class="center one float_left">大厦大厦多</li>
            <li class="center two float_left">处理人</li>
            <li class="center three float_left">2017.6.2</li>
            <li class="center four float_left">下一步</li>
            <li class="center five float_left">办理办理意见办理意见办理意见意见</li>
          </ul>
          <div class="history_img"></div>
        </div>
      </div>
    </div>
    <!--<public-opinion  :width="1000"></public-opinion>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import ProceHistory from 'components/proce-history/proce-history'
  //  import PublicOpinion from 'components/public-opinion/public-opinion'

  export default {
    props: [],
    data () {
      return {
        left_isSHow: true,
        right_isSHow: false
      }
    },
    created() {
    },
    methods: {
      togglePubOpi(val){
        this.isShow = val
        if (val) {
        }
      },
      changeShow (e) {
        e = e || window.e
        if (e.target.innerHTML === '业务流程') {
          this.left_isSHow = true
          this.right_isSHow = false
          Array.prototype.slice.call(e.target.parentNode.children).forEach(v => {
            v.classList.remove("active")
          })
          e.target.classList.add("active")
        } else if (e.target.innerHTML === '流转历史') {
          this.left_isSHow = false
          this.right_isSHow = true
          Array.prototype.slice.call(e.target.parentNode.children).forEach(v => {
            v.classList.remove("active")
          })
          e.target.classList.add("active")
        }
      }
    },
    components: {
      ProceHistory,
//      PublicOpinion
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  .box
    background $color-background-d
    color #000
    position absolute
    top 0
    left 0
    right 0
    z-index 11
    padding 100px 0
    min-height 100%
    .contain
      width 1000px
      margin 0 auto
      .wrap_title
        padding 0 30px
        background-color #5587d7
        height 50px
        line-height 50px
        color #fff
        font-size 16px
      .active
        font-size 18px
        font-weight 800
      .ml10
        margin-left 10px


  .history
    padding 20px 10px
    border 1px solid #ccc
    .history_title
      height 40px
      line-height 40px
      &:nth-child(2n)
        background-color #fbfbfb
      &:first-child
        background #eee
        color #666
      .center
        text-align center
      .one
        width 15%
      .two
        width 15%
      .three
        width 15%
      .four
        width 15%
      .five
        width 40%
    .history_img
      background-color #f6f6f6
      height 400px
      width 100%
      margin-top 40px
</style>
