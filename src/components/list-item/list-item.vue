<template>
  <div>
    <ul :class="{deep: isChecked}" class="list-item pointer clearfix">
      <label>
        <li class="float_left input center"><input type="checkbox" class="pointer" v-model="isChecked"></li>
      </label>
      <li class="float_left category center fontomit">
        <div class="multi_center">
          <p>【政治安全】</p>
          <p>涉及领导人信息</p>
        </div>
      </li>
      <li class="float_left title">
        <div class="multi_center">
          <router-link tag="p" to="/business">
            <p class="t fontomit">如果用Vue完整独立版本（直接用&lt;script&gt;元素引入Vue），生产时应该用精简版本（vue.min.js)。请查看安装指导，附有开发与精简版本。</p>
          </router-link>
          <p class="c fontomit">
            <span class="center comment">评</span>
            <span>如果用Webpack或Browserify类似的打包工具时，生产状态会在Vue源码中由process.env.NODE_ENV决定，默认在开发状态。</span>
          </p>
        </div>
      </li>
      <li class="float_left unit center common_css fontomit">深圳</li>
      <li class="float_left person center common_css fontomit">张三三</li>
      <li class="float_left time center fontomit">11-24 12:21</li>
      <li class="float_left address common_css center fontomit">深圳</li>
      <li class="float_left point common_css center fontomit">采分</li>
      <li class="float_left status center">
        <span class="state">等待信息初审</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['list'],
    data () {
      return {
        isChecked: false,
        modal: false
      }
    },
    methods: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .list-item
    width 100%
    height 70px
    line-height 70px
    background $color-background-d
    margin-top 8px
    overflow hidden
    color #000
    font-size $font-size-medium
    &:hover
      box-shadow 0 0 20px 0 #D7D7D7
    .common_css
      width 8%
    .input
      width 50px
    .category
      width 12%
      height 70px
      position relative
      line-height 20px
    .title
      width calc(34% - 50px)
      position relative
      height 70px
      line-height 25px
      .t
        font-size $font-size-medium-x
        color $color-text-d
        &:hover
          color $color-sub-theme
      .c
        font-size $font-size-small
        color $color-text-ll
        .comment
          display inline-block
          width 15px
          height 15px
          font-size 11px
          border(#ff7c12)
          color #ff7c12
          line-height 15px
          border-radius 3px
          margin-right 7px
    .time
      width 12%
    .status
      width 10%
      text-overflow ellipsis
      .state
        display inline-block
        width 99px
        height 25px
        color #ff7e00
        border(#ff7e00)
        border-radius 5px
        line-height 23px

</style>
