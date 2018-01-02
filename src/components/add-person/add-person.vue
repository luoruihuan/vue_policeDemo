<template>
  <li class="item clearfix float_left" :style='{width: item.percentage}'>
    <span class="float_left content">
      <span class="left float_left">
        <span class="name float_left">{{item.name}}</span>
        <span class="red float_left" v-if="item.isRequired">*</span>
      </span>
      <span class="right float_left clearfix">
				<span class="has float_left" v-for="(i, index) in arr" :key="index">{{i}}</span>
				<span class="iconfont icon-jia pointer float_left center" @click="add"></span>
      </span>
      <!--绑定name属性-->
      <span class="zIndex">
        <input type="checkbox" :name="i" v-for="(i, index) in arr" :key="'123456'+index" :value="i" checked>
      </span>
    </span>
    <modal :modal="modal" v-on:hideModal="modal = false" :width="600">
      <span slot="title">添加{{item.name}}</span>
      <div slot="content" class="modal_content clearfix">
        <span class="left float_left">姓名：</span>
        <input type="text" class="text float_left" v-model="person_name">
        <button class="float_left save pointer button" @click="savePerson">保存</button>
      </div>
    </modal>
  </li>
</template>

<script type="text/ecmascript-6">
  import  Modal from 'components/modal/modal'

  export default {
    props: ['item'],
    name: 'add',
    data () {
      return {
        modal: false,
        person_name: '',
        arr: []
      }
    },
    mounted() {
      this.arr = this.item.value
    },
    methods: {
      add() {
        this.person_name = ''
        this.modal = true
      },
      savePerson() {
        if (this.person_name.replace(/(^\s*)|(\s*$)/g, "") === '') {
          alert('输入内容不能为空！')
          return
        }
        this.arr.push(this.person_name)
        let data = {
          name: this.item.name,
          val: this.arr
        }
        this.$emit('changeData', data)
        this.modal = false
      }
    },
    components: {
      Modal
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .item
    line-height 49px
    height 50px
    overflow hidden
    color $color-text-d
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    .content
      width 100%
      .text
        height 38px
        border(#ABADB3)
        padding-left 6px
        box-shadow 0 3px 5px 0 #e0e0e0 inset
        margin-top 6px
      .has
        padding-right 14px
        font-weight bold
      .iconfont
        border(#ccc)
        line-height 23px
        width 25px
        margin-top 12px
        color $color-text-ll
        font-size $font-size-medium
      .zIndex
        opacity 0
        z-index -1
      .left
        width 95px
        /*margin-right 25px*/
      .right
        max-width calc(100% - 95px)
        overflow auto
      .red
        color #FF3357
        line-height 60px
        font-size 24px

    .modal_content
      font-size $font-size-medium
      line-height 36px
      color #322626
      .text
        line-height 34px
        width 300px
        padding-left 10px
        box-shadow 3px 3px 5px 0 #e0e0e0 inset
        border(#aaa)
      .save
        background #4894F4
        line-height 36px
        color $color-text
        padding 0 25px
        margin-left 5px
        &:hover
          background #4589e6
</style>
