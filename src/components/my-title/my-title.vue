<template>
  <li class="item-title info float_left">
    {{item.name || item.group_name}}
    <span class="right float_right pointer" v-show="item.isEdit" @click="changeEdit">
      <span class="icon iconfont icon-jilu" ></span>
              {{edit?'保存':'编辑'}}
     </span>
    <span class="right_name float_right pointer" @click='toggleModal'>{{item.right}}</span>
  </li>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  export default {
    props: ['item'],
    data () {
      return {
      }
    },
    computed: {
      ...mapState([
        'edit'
      ])
    },
    watch: {
      item: {
        handler: function(newVal, oldVal) {
        },
        deep: true
      }
    },
    methods: {
      ...mapActions([
        'changeEdit'
      ]),
      toggleModal () {
        this.bus.$emit('toggleModal1')
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .item-title
    margin-top -12px
    margin-bottom 15px
    padding-top 20px!important
    font-size 16px
    font-weight 800
    color $color-sub-theme
    width 883px
  .item-title:first-child
      margin-top -1px
    &.info
      margin-top 20px
      padding 5px 30px 0
      width calc(100% + 60px)
      margin-left -30px
      border-top 1px solid #ccc
    .right
      font-size 14px
      font-weight nomal
    .right_name
      font-size: 14px
      font-family "Microsoft YaHei"
      color #5587d7
</style>
