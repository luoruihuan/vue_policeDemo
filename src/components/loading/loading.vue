<template>
  <div class="wrap">
    <ring v-show="loadingView" :circleCss="circleCss">
      <span slot="text">加载中……</span>
    </ring>
    <div v-show="errorView" class="error center">加载失败，请稍候再试。</div>
    <div v-show="successView" class="success center">暂无相关数据。</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import Ring from 'components/circle/circle'

  export default {
    props: {},
    data() {
      return {
        circleCss: {
          // 环形的大小
          circle_scale: 100,
          // 内环的宽度
          innerC_width: 6,
          // 内环已完成部分的颜色
          borderColor_on: '#EDEDEF',
          // 内环未完成部分的颜色
          borderColor_off: '#64a2ff',
          // 外环的颜色
          outC_color: '#6bc1ff',
          // 外环的宽度
          outC_width: 1,
          color: '#1c2841',
          font_size: '20px',
          autoPlay: true,
          font_family: 'Microsoft Yahei'
        }
      }
    },
    methods: {},
    computed: {
      ...mapState([
        'successView',
        'loadingView',
        'errorView'
      ])
    },
    components: {
      Ring
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrap
    margin-top 20px
    .error, .success
      width 200px
      margin 0 auto
      color #1c2841
</style>
