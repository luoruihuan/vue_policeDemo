<template>
  <div class="clearfix wrap">
    <div class="left float_left">评论列表</div>
    <ul class="right float_left">
      <li class="list" v-for="i in lists">
        <p class="title clearfix"><span class="author float_left">{{i.sup_user_name}}</span><span
          class="time float_left"></span></p>
        <p class="info">{{i.sup_content}}</p>
      </li>
      <li class="add_wrapper">
        <div class="add_left float_left">
          <textarea placeholder="请输入" cols="30" rows="5" class="multi_text" v-model="msg"></textarea>
        </div>
        <div class="add_right float_left">
          <div class="">
            <!--<p class="center"><input type="checkbox" value="1" v-model="text">短信通知</p>-->
            <!--<p class="center"><input type="checkbox" value="1" v-model="email">邮件通知</p>-->
            <p @click="add" class="center btn pointer"><input type="button">添加</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['supervision', 'new_supervision'],
    data() {
      return {
        msg: '',
        text: false,
        email: false,
//        hasAdd: false,
        arr: []
      }
    },
    computed: {
      lists() {
        return (JSON.parse(JSON.stringify(this.supervision)))
      },
      data() {
        return this.new_supervision[0]
      }
    },
    methods: {
      add() {
//        this.hasAdd = true
        if (this.msg.replace(/(^\s*)|(\s*$)/g, "") === '') {
          alert('输入内容不能为空！')
          return
        }
        let item = JSON.parse(JSON.stringify(this.data))
        item.sup_content = this.msg
        item.need_sms = this.text ? 1 : 0
        item.need_mail = this.email ? 1 : 0
        this.lists.push(item)
        this.arr.push(item)
        this.msg = ''
        this.text = false
        this.email = false
        this.$emit('send_new_supervision', this.arr)
      }
    },
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .wrap
    padding 20px 30px
    margin-top -1px
    border 1px solid #CCCCCC
    .left
      width 100px
      line-height 49px
      margin-right 15px
    .right
      width 693px
      padding 6px
      .list
        line-height 20px
        padding-bottom 20px
        .title
          padding 0 5px
          border-bottom 1px solid #f0f0f0
          .author
            padding-right 20px
            color $color-theme-d
        .info
          padding 0 5px
      /*text-indent 2em*/
      .add_wrapper
        height 120px
        .add_left
          width 80%
          height 100%
          .multi_text
            border 1px solid #CCCCCC
            height 100%
            width 100%
            padding 6px
            resize none
            box-shadow 0 3px 5px 0 #e0e0e0 inset
        .add_right
          width 20%
          position relative
          height 100%
          .btn
            background $color-sub-theme
            color $color-text
            margin 0 20px
            border-radius 2px
            &:hover
              background #507ec9

</style>
