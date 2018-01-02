<template>
  <li class="item clearfix float_left">
    <span class="name float_left left">{{item.name}}</span>
    <!--左边-->
    <span class="r_left float_left">
      <div class="org float_left pointer" v-for="(i,index) in has_arr" :key="index">
        <!--重点人-->
        <span :id="i.peopleId" v-if="i.peopleName">{{i.peopleName}}</span>
        <!--重点网站-->
        <span class="w50" :id="i.ledgerId" v-if="i.siteName">{{i.siteName}}&nbsp;&nbsp;&nbsp;{{i.siteDomain}}</span>
        <!--重点帐号-->
        <span class="w50" :id="i.ledgerId" v-if="i.accountName">{{i.accountName}}</span>
        <!--重点事件-->
        <span class="w50" :id="i.ledgerId" v-if="i.eventName">{{i.eventName}}</span>
        <!--<span v-if="i.cardid">{{i}}</span>-->
        <span class="iconfont icon-cuowu" @click="add($event, i, index)"></span>
      </div>
    </span>
    <!--右边-->
    <span class="r_right float_left">
      <div class="i">{{item.name}}列表</div>
      <div class="i org pointer" v-for="(i,index) in not_arr" @click="reduce($event, i, index)" :key="index">
        <!--重点人-->
        <span class="w50" :id="i.peopleId" v-if="i.peopleName">{{i.peopleName}}</span>
        <!--重点网站-->
        <span class="w50" :id="i.ledgerId" v-if="i.siteName">{{i.siteName}}&nbsp;&nbsp;&nbsp;{{i.siteDomain}}</span>
        <!--重点帐号-->
        <span class="w50" :id="i.ledgerId" v-if="i.accountName">{{i.accountName}}</span>
        <!--重点员工-->
        <span class="w50" :id="i.ledgerId" v-if="i.eventName">{{i.eventName}}</span>
      </div>
    </span>
  </li>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  export default {
    props: ['item','has_arr'],
    data () {
      return {
        not_arr: [],
        flag_item: '', //标记左边,
      }
    },
    created() {
    },
    computed: {
      ...mapState([
        'important_lists', //提交表单数据
        'important_send_lists', //渲染数据
        'important_lists_empty',
      ])
    },
    watch: {
      important_send_lists: function(newVal, oldVal) {
        let my_arr =  []
        for(let key in newVal) {
          my_arr[key] = newVal[key]
        }
        this.not_arr = my_arr
//        this.not_arr = newVal
      }
    },
    methods: {
      _updateData() {
        let data = {
          name: this.item.name,
          val: this.has_arr
        }
        this.$emit('changeData', data)
      },
      add (e, i, index) {
        this.has_arr.splice(index, 1)
        this.not_arr.push(i)
        this._updateData()
      },
      reduce (e, i, index) {
        if(this.item.isSingle && this.has_arr.length>0) {
          this.not_arr.splice(index, 1)
          this.not_arr.push(this.has_arr[0]) //添加到not_arr
          this.has_arr.push(i)
          this.has_arr.splice(0,1) //删除之前的
        }else {
          this.not_arr.splice(index, 1)
          this.has_arr.push(i)
        }
        this._updateData()
      }
    },
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .item
    height 360px !important
    color $color-text-d
    width 900px
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    .left2
      width 100px
      margin-right 15px
    .r_left, .r_right
      width 295px
      margin-right 10px
      height 348px
      margin-top 6px
      overflow auto
      border(#ABADB3)
    .w50
      min-width 60px
      display inline-block
    .r_left
      padding 5px 10px
      line-height 26px
      box-shadow 0 3px 5px 0 #e0e0e0 inset
      background #FBFBFB
      .org
        font-size $font-size-medium
        border(#CCCCCC)
        margin-right 10px
        margin-bottom 5px
        color $color-text-d
        border-radius 4px
        padding 0 10px
        .iconfont
          margin-left 10px
          font-size $font-size-small
    .r_right
      .i
        height 40px
        line-height 40px
        width 100%
        background #F4F4F4
        padding-left 20px
        color #888888
        border-bottom 1px solid #EEEEEE
        &.org
          padding-left 14px
          background $color-background-d
          width 94%
          margin 0 auto
          color $color-text-d
</style>
