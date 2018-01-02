<template>
  <div>
    <transition name="mask">
      <div class="mask" v-show="modal" @click="hideModal">
        <transition name="toggle">
          <div :style="box_style" class="contents_wrapper" v-show="modal" @click.stop>
            <div class="modal_header clearfix">
              <slot name="title"></slot>
              <span @click="hideModal" class="close iconfont icon-cuowu pointer float_right"></span></div>
            <div class="modal_content">
              <slot name="content"></slot>
              <div class="h50"></div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['modal', 'width', 'top'],
    data () {
      return {}
    },
    methods: {
      hideModal () {
        this.$emit('hideModal')
      }
    },
    computed: {
      box_style () {
        let width = this.width + 'px'
        let top = this.top + 'px'
        let marginLeft = -this.width / 2 + 'px'
        if (this.top) {
          if (top.indexOf('%') > 0) {
            top = this.top
          }
        }
        if (this.width) {
          if (width.indexOf('%') > 0) {
            width = this.width
            marginLeft = -(parseInt(this.width) / 2) + '%'
          }
        }
        return {
          width: width,
          top: top,
          marginLeft: marginLeft
        }
      }
    },
    components: {},
    watch: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mask
    background rgba(0, 0, 0, .5)
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 99
    &.mask-enter-active, &.mask-leave-active
      opacity 1
      transition all .3s
    &.mask-enter, &.mask-leave-active
      opacity 0

    .contents_wrapper
      width 900px
      background #fff
      border-radius 8px
      position absolute
      left 50%
      margin-left -450px
      top 20%
      &.toggle-enter-active, &.toggle-leave-active
        opacity 1
        transition all .3s
      &.toggle-enter, &.toggle-leave-active
        transform scale(0.9)
        opacity 0

      &.searchModal
        width 86%
        left 50%
        top 10%
        margin-left -43%
        max-height 700px
        overflow auto
      .modal_header
        height 42px
        border-radius 8px 8px 0 0 / 8px 8px 0 0
        line-height 42px
        background #4894F4
        color #fff
        font-size 16px
        padding-left 30px
        .close
          padding-right 20px
          &:hover
            color #333
            transition color .5s ease
      .modal_content
        font-size 14px
        line-height 30px
        box-sizing content-box
        max-height 78vh
        overflow auto
        color #342626
        border-radius 0 0 8px 8px / 0 0 8px 8px
        padding 50px 50px 0 50px
        .h50
          height 90px

</style>
