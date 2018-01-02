<template>
  <div class="content_wrapper">
    <div class="content clearfix">
      <!--流转历史-->
      <div class="progress_wrapper float_left center" v-for="i in 15">
        <div class="multi_center">
          05-26<br/>11:06
        </div>
        <div class="prompt">
          产品<br/>转入本地研判
        </div>
        <div class="progress">
        </div>
      </div>
      <!--<my-element :infos="infos"></my-element>-->
      <!--<ul class="items clearfix">-->
      <!--<component :is='MyInput'></component>-->
      <!--<component :is='MySelect'></component>-->
      <!--<component :is='MyTextarea'></component>-->
      <!--<component :is='MySpan'></component>-->
      <!--<component :is='MyEnclosure'></component>-->
      <!--<component v-for="(info, index) in infos" :is='info.type' :key="index" :item="info"></component>-->
      <!--<receive :item="item"></receive>-->
      <!--</ul>-->
    </div>
    <!--    <div class="container" style="left: 50%">
          <div class="wave w800"></div>
        </div>
        <div class="container" style="left: 20%">
          <div class="wave w400"></div>
        </div>
        <div class="container" style="left: 80%;">
          <div class="wave w1000"></div>
        </div>-->
    <ring :circleCss="circleCss">
      <span slot="text">加载中……</span>
    </ring>
    <loading></loading>
  </div>
</template>
<script type="text/ecmascript-6">
  //  import MyElement from 'components/element/element'
  //  import MyInput from 'components/my-input/my-input'
  //  import MySelect from 'components/my-select/my-select'
  //  import MyTextarea from 'components/my-textarea/my-textarea'
  //  import MySpan from 'components/my-span/my-span'
  //  import MyEnclosure from 'components/my-enclosure/my-enclosure'
  //  import MyBottom from 'components/my-bottom/my-bottom'
  //  import Receive from 'components/receive/receive'
  import Ring from 'components/circle/circle'
  import Loading from 'components/loading/loading'

  export default {
    props: {},
    data() {
      return {
//        MyInput: MyInput,
//        MySelect: MySelect,
//        MyTextarea: MyTextarea,
//        MySpan: MySpan,
//        MyEnclosure: MyEnclosure,
//        MyBottom: MyBottom,
//        Receive: Receive,
//        view7: MyInput,
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
          outC_color: '#FFCCCC',
          // 外环的宽度
          outC_width: 1,
          color: '#fff',
          font_size: '20px',
          autoPlay: true,
          font_family: '方正兰亭超细黑简体'
        },
        item: {
          "node_id": 1,
          "field_id": 3,
          "field_name": "noticetype",
          "display_name": "责任单位",
          "group_name": "",
          "data_type": 3,
          "enum_type": 1,
          "readonly": 0,
          "cpt_type": 4,
          "new_value": ""
        }
      }
    },
    created() {
    },
    methods: {},
    components: {
//      MyElement,
//      Receive,
//      MyInput,
//      MySelect,
//      MyTextarea,
//      MySpan,
//      MyEnclosure,
      Ring,
      Loading
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .content_wrapper
    overflow hidden
    padding 110px 30px 70px 30px
    .content
      width 100%
      margin 0 auto
      /*height 700px*/
      background #fff
      border 1px dotted #3b5998

      .progress_wrapper
        position relative
        height 100px
        width 100px
        background #FFFFFF
        border 4px solid #B3B3B3
        border-radius 50%
        margin 0 40px 80px
        color #333333
        font-size $font-size-large
        line-height 25px
        &:after, &:before
          content ''
          position absolute
          width 37px
          height 6px
          top 50%
          transform translateY(-50%)
          background #559cf2
        &:after
          left -44px
        &:before
          right -44px
        .progress
          position absolute
          border 8px solid #b3b3b3
          border-bottom 8px solid transparent
          border-left 8px solid transparent
          border-right 8px solid transparent
          top 95px
          left 50%
          transform translateX(-50%)
        .prompt
          position absolute
          bottom -60px
          width 120px
          left 50%
          line-height 1.2
          font-size $font-size-medium-x
          transform translateX(-50%)

  .container
    position absolute
    width 400px
    height 400px
    border 5px solid #CCCCCC
    top 60%
    transform translate(-50%, -50%)
    border-radius 50%
    overflow hidden
    .wave
      position relative
      left -5px
      top -5px
      width 400px
      height 400px
      background-image radial-gradient(circle 200px at 200px 200px, #64a2ff 0px, #3a87bd)
      border-radius 50%
      &::before, &::after
        content ""
        position absolute
        top 0
        background-color rgba(255, 255, 255, .4)
        border-radius 45%
        transform translate(-50%, -70%) rotate(0)
        animation rotate 6s linear infinite
        z-index 10
      &::after
        border-radius 47%
        background-color rgba(255, 255, 255, .9)
        transform translate(-50%, -70%) rotate(0)
        animation rotate 10s linear -5s infinite
        z-index 20
      &.w400
        &:before, &:after
          height 400px
          width 400px
          left 50%
      &.w800
        &:before, &:after
          height 800px
          width 800px
          left 50%
      &.w1000
        &:before, &:after
          height 1000px
          width 1000px
          left 50%
    @keyframes rotate
      50%
        transform translate(-50%, -70%) rotate(180deg)
      100%
        transform translate(-50%, -70%) rotate(360deg)

</style>
