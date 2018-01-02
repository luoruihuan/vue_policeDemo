<template>
  <li class="div_box float_left" :style="{width: item.percentage}">
    <div class="com_div clearfix" v-if="item.area">
      <span class="span3 float_left span1">{{item.area.name}}</span>
      <span class="span2 float_left">{{item.area.state}}；{{item.area.time}}</span>
    </div>
    <div class="com_div clearfix" v-if="item.theme">
      <span class="span4 float_left">{{item.theme.name}}：</span>
      <span class="span2 float_left">{{item.theme.cont}}</span>
    </div>
    <div class="com_div clearfix" v-if="item.content">
      <span class="span4 float_left">{{item.content.name}}：</span>
      <ul class="span2 float_left">
        <li v-for="(v, i) in item.content.data" :key="i"><span class="blue">{{v.name}}</span>&nbsp;:&nbsp;{{v.cont}}<span class="ml10">({{v.time}})</span></li>
      </ul>
    </div>
    <div class="com_div clearfix" v-if="item.file">
      <span class="span4 float_left">{{item.file.name}}：</span>
      <ul class="span2 float_left">
        <li class="point float_left" v-for="(v, i) in item.file.data" :key="i">{{v}} <span v-if="item.file.data.length!=i+1">、</span> </li>
      </ul>
    </div>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    props: ['item']
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .div_box
    font-size 14px
    border-bottom 1px dotted #ccc
    padding 10px 0
    .com_div
      /*height 38px*/
      line-height 38px
    .point
      cursor pointer
    .blue
      color #5587d7
    .ml10
      margin-left 10px
    .span1
      width 95px
      font-weight 900
      color $color-text-d
    .span4
      width 95px
    .post, .close
      background $color-sub-theme
      line-height 30px
      height 30px
      width 80px
      border-radius 4px
      color $color-text
      &:hover
        background #5276C3
    .close
      background #CFD9E9
      color $color-text-d
      margin-left 5px
      &:hover
        background #C5CFDF
</style>
