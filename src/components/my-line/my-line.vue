<template>
  <div :class="{line_horizontal:!vertical, line_vertical:vertical}" :style="m_line"></div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['width', 'height', 'vertical'],
    data () {
      return {}
    },
    computed: {
      m_line () {
        let width = this.width + 'px'
        let height = this.height + 'px'
        let top = 'calc(' + (50 % -(this.height / 2)) + ')px'
        if (this.width) {
          if (width.indexOf('%') > 0) {
            width = this.width
          }
        }
        if (this.height) {
          if (height.indexOf('%') > 0) {
            height = this.height
            top = 'calc(' + (50  -(parseInt(height) / 2)) + '%)'
          }
        }
        return {
          width: width,
          height: height,
          top: top
        }
      }
    },
    methods: {},
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .line_horizontal
    height 1px
    width 94%
    margin 0 auto
    position relative
    background #335C9C
    &:after, &:before
      content ''
      display block
      position absolute
      height 3px
      width 10px
      top -1px
      background #3762A7
    &:after
      right 0

  .line_vertical
    height 96%
    width 1px
    float left
    position relative
    top calc(50% - 48%)
    background #335C9C
    &:after, &:before
      content ''
      display block
      position absolute
      height 10px
      width 3px
      left -1px
      background #3762A7
    &:before
      top 0
    &:after
      bottom 0
</style>
