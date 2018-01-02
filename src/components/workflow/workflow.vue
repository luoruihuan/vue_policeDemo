<template>
  <div>
    <!--载体字段-->
    <field-list :field_list="workflow_lists.field_list"></field-list>
    <!--本节点附件列表-->
    <!--附件列表-->
    <!--新附件-->

    <!--评论信息--><!--新评论-->
    <comments @send_new_supervision="get_new_supervision"
              :supervision="workflow_lists.workflow_carriers_instance_supervision"
              :new_supervision="workflow_lists.new_supervision"></comments>
    <!--督办记录--><!--新添加的督办-->
    <supervise @send_new_supervision="get_new_supervision"
               :supervision="workflow_lists.workflow_carriers_instance_supervision"
               :new_supervision="workflow_lists.new_supervision"></supervise>
    <!--流转按钮列表-->
    <div class="item clearfix float_left center">
      <my-button v-for="(item, index) in workflow_lists.workflow_node_operate" :key="index" :item="item"></my-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import FieldList from 'components/field_list/field_list'
  import Supervise from 'components/supervise/supervise'
  import Comments from 'components/comments/comments'
  import MyButton from 'components/my-button/my-button'

  export default {
    props: ['workflow_lists'],
    data() {
      return {}
    },
    mounted() {
//      console.log(workflow_lists);
    },
    methods: {
      get_new_supervision(data) {
        console.log(data);
      }
    },
    components: {
      FieldList,
      MyButton,
      Supervise,
      Comments
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .item
    line-height 49px
    overflow hidden
    border-radius 0 0 8px 8px
    position absolute
    bottom 0
    left 0
    right 0
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    height 70px
    background #EEF3FB
    .btn
      display inline-block
      background $color-sub-theme
      line-height 30px
      margin 0 30px
      height 30px
      padding 0 15px
      border-radius 4px
      color $color-text
      margin-top 18px
      &:hover
        background #5276C3
      &.close
        background #CFD9E9
        color $color-text-d
        &:hover
          background #cad3e3
</style>
