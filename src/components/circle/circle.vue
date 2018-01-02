<template>
  <div class="circle_wrapper" :style="circleScale">
    <div class="circle_left_wrapper">
      <div :class="{leftCircle:circleCss?circleCss.autoPlay:false}" id="circle_left" :style="[circleBorder, leftCircle]"></div>
    </div>
    <div class="circle_right_wrapper">
      <div :class="{rightCircle:circleCss?circleCss.autoPlay:false}" id="circle_right" :style="[circleBorder, rightCircle]"></div>
    </div>
    <div class="content" :style="textStyle">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['circleCss', 'rate'],
    data () {
      return {}
    },
    mounted () {
    },
    methods: {},
    computed: {
      leftCircle () {
        var leftDeg
        var completionRate = this.rate
        var deg = 360 * (1 - completionRate)
        if (deg > 180) {
          leftDeg = 180
        } else {
          leftDeg = deg
        }
        return {
          transform: 'rotate(' + (-45 - leftDeg) + 'deg)'
        }
      },
      rightCircle () {
        if (this.circleCss) {
          var rightDeg
          var completionRate = this.rate
          var deg = 360 * (1 - completionRate)
          if (deg > 180) {
            rightDeg = deg - 180
          } else {
            rightDeg = 0
          }
          return {
            transform: 'rotate(' + (135 - rightDeg) + 'deg)'
          }
        }
      },
      // 外环的样式
      circleScale () {
        if (this.circleCss) {
          return {
            height: this.circleCss.circle_scale + 'px',
            width: this.circleCss.circle_scale + 'px',
            border: this.circleCss.outC_width + 'px solid ' + this.circleCss.outC_color,
            padding: this.circleCss.distance + 'px'
          }
        }
      },
      // 内环的样式
      circleBorder () {
        if (this.circleCss) {
          return {
            border: this.circleCss.innerC_width + 'px solid ' + this.circleCss.borderColor_on,
            'border-right': this.circleCss.innerC_width + 'px solid ' + this.circleCss.borderColor_off,
            'border-bottom': this.circleCss.innerC_width + 'px solid ' + this.circleCss.borderColor_off
          }
        }
      },
      // 内容文本的样式
      textStyle () {
        if (this.circleCss) {
          return {
            color: this.circleCss.color,
            'font-size': this.circleCss.font_size,
            'font-family': this.circleCss.font_family
          }
        }
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .circle_wrapper
    height 300px
    width 300px
    margin 0 auto
    border-radius 50%
    padding 6px
    box-sizing content-box
    border 4px solid #9BD999
    position relative
    .content
      width 44%
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      /*text-align center*/
      color #ffffff
      padding 5px 0
      font-size 30px
      font-family '方正兰亭超细黑简体'
    .circle_left_wrapper, .circle_right_wrapper
      height 100%
      width 50%
      float left
      overflow hidden
      #circle_left, #circle_right
        position relative
        height 100%
        width 200%
        border-radius 50%
        box-sizing border-box
        border 20px solid #9BD999
        border-right 20px solid #e5e5e5
        border-bottom 20px solid #e5e5e5
      #circle_left
        transform rotate(-45deg)
        &.leftCircle
          animation leftCircle 6s linear infinite
      #circle_right
        left -100%
        transform rotate(135deg)
        &.rightCircle
          animation rightCircle 6s linear infinite

  @keyframes leftCircle
    0%
      transform rotate(-45deg)
    50%, 100%
      transform rotate(-225deg)

  @keyframes rightCircle
    0%, 50%
      transform rotate(135deg)
    100%
      transform rotate(-45deg)


</style>
