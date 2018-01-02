<template>
  <div>
    <input type="button" @click="clickHandle" class="float_right btn pointer center"
           :class="{close: item.event === 'close'}" :value="item.target_node_name">
    <!--<modal :modal="modal" :width="'500'" :top="'25%'" v-on:hideModal="modal = false">
      <span slot="title">创建通知</span>
      <div slot="content" class="modal_content clearfix">
        <add :form_lists="form_lists"></add>
      </div>
    </modal>-->
  </div>
</template>
<script type="text/ecmascript-6">
  //  import Add from 'components/my-add/my-add'
  import Modal from 'components/modal/modal'

  export default {
    props: ['item'],
    data() {
      return {
        modal: false,
        form_lists: []
      }
    },
    created() {
    },
    methods: {
      clickHandle() {
        if (this.item.event === 'post') {
          console.log('一个ajax请求')
          alert('保存成功')
        }
        if (this.item.event === 'close') {
          console.log('取消修改')
          alert('放弃更改')
        }
        if (this.item.event === 'jump') {
          console.log('跳转到业务流转页面')
          this.$router.push('/business')
        }
        if (this.item.event === 'showModal') {
          console.log('出现一个弹窗')
          this.modal = true
        }
      }
    },
    components: {
//      Add,
      Modal
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .btn
    background $color-sub-theme
    line-height 30px
    height 30px
    width 80px
    border-radius 4px
    color $color-text
    margin-top 20px
    margin-right 5px
    &:hover
      background #5276C3
    &.close
      background #CFD9E9
      color $color-text-d
      &:hover
        background #cad3e3
</style>
