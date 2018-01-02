<template>
  <div class="header_wrapper">
    <div class="logo_wrapper float_left">
      <div class="logo_top"><img class="logo" src="./login_ico.png" alt=""><span class="bold">清朗</span>舆情管理平台</div>
      <p class="inlineblock buildNumber">管理端-V1.0.0.20170623</p>
    </div>
    <div class="nav float_left">
      <router-link class="menu float_left center pointer workbench" tag="div" to="/workbench">工作台</router-link>
      <router-link class="menu float_left center pointer big_center" tag="div" to="/center">联动大屏</router-link>
      <router-link class="menu float_left center pointer management" tag="div" to="/management">舆情管理</router-link>
      <router-link class="menu float_left center pointer safe" tag="div" to="/safe">网络安全</router-link>
      <router-link class="menu float_left center pointer archives" tag="div" to="/archives">档案资料</router-link>
      <router-link class="menu float_left center pointer assessment" tag="div" to="/assessment">工作考核</router-link>
      <router-link class="menu float_left center pointer duty" tag="div" to="/duty">值班管理</router-link>
      <router-link class="menu float_left center pointer set" tag="div" to="/set">系统设置</router-link>
    </div>
    <div class="login float_right"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {},
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .header_wrapper
    height 90px
    line-height 90px
    width 100%
    right 0
    background #1F2B3B
    position fixed
    z-index 10
    .logo_wrapper
      width 331px
      line-height 40px
      font-size $font-size-large-xx
      font-family '方正兰亭超细黑简体'
      text-align center
      .logo_top
        margin-top 14px
        .logo
          vertical-align middle
          margin-right 10px
          height 39px
        .bold
          font-weight bold
    .buildNumber
      line-height 20px
      padding-left 7px
      font-size 14px
      font-family '方正兰亭超细黑简体'
      color #6e707b
    .nav
      /*不兼容IE9*/
      display flex
      width 704px
      height 90px
      .menu
        /*不兼容IE9*/
        flex 1
        width 12.5%
        text-indent -9999px
        &.workbench
          background url(header.png) 0 0
          &.router-link-active, &:hover
            background url(header.png) 0 -90px
        &.big_center
          background url(header.png) -88px 0
          &.router-link-active, &:hover
            background url(header.png) -88px -90px
        &.management
          background url(header.png) -176px 0
          &.router-link-active, &:hover
            background url(header.png) -176px -90px
        &.safe
          background url(header.png) -264px 0
          &.router-link-active, &:hover
            background url(header.png) -264px -90px
        &.archives
          background url(header.png) -352px 0
          &.router-link-active, &:hover
            background url(header.png) -352px -90px
        &.assessment
          background url(header.png) -440px 0
          &.router-link-active, &:hover
            background url(header.png) -440px -90px
        &.duty
          background url(header.png) -528px 0
          &.router-link-active, &:hover
            background url(header.png) -528px -90px
        &.set
          background url(header.png) -616px 0
          &.router-link-active, &:hover
            background url(header.png) -616px -90px




</style>
