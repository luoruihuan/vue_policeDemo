<template>
  <div class="slider_wrapper">
    <div class="slider">
      <ul>
        <router-link tag="div" v-for='(item, index) in items' :to="item.path" :key="index">
          <li v-on:click="changeStyle($event, index, item)" :id="item.id"
              :class="{'select': (item.path == $route.fullPath)}" class="pointer">
            <div class="title">
              {{item.title}}
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            title: '班次管理',
            path: '/set/shift'
          }
        ],
        p_arr: [['系统设置', '流程管理'],['系统设置', '班次管理']]
      }
    },
    methods: {
      changeStyle (event, index, item) {
        this.$emit('updateP', this.p_arr[index])
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'

  .slider_wrapper
    float left
    width 220px
    height calc(100vh - 90px)
    transition width .8s
    .slider
      /*当元素完全脱离文档流，则无法继承父元素的宽度，继承的是body的宽度*/
      width 220px
      height 100vh
      position fixed
      background #f9f9f9
      top 160px
      z-index 20
      border-right 1px solid #E0E0E0
      transition width .8s
      color $color-text-d
      li
        line-height 42px
        text-align right
        padding 10px 0 10px 20px
        .title
          padding-right 28px
  .select
    background #367fdb
    color #fff
    box-shadow 1px 0 0 0 #367fdb
  .slider ul li:not(.select):hover
    color #367fdb
  .slider ul li:not(.select):hover .title
    box-shadow 1px 0 0 0 #367FDB
    border-right 2px solid #367FDB
    padding-right 26px
</style>
