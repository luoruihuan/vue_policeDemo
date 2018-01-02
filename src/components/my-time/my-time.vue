<template>
  <li class="item float_left clearfix" :style='{width: item.percentage}'>
    <span class="float_left i">
              <span class="left float_left">
                <span class="name float_left">{{item.display_name || item.name}}</span>
                <span class="red float_left" v-if="item.isRequired">*</span>
              </span>
              <span class="type pointer float_left text w232"
                    style="position: relative;line-height: 38px;color:#757575;padding-left: 10px;">
                      <upload-time :timeType="type_name" @timeStr="startTime"></upload-time>
                      <upload-time v-if="item.cpt_type===11" :timeType="type_name" @timeStr="endTime"></upload-time>
                <!--<input type="hidden" checked :name="item.time[0].name || '选择时间'" :value="time">-->
                 </span>
              <span v-if="item.search_btn" class="btn float_left">{{item.search_btn.value}}</span>
    </span>
  </li>

</template>

<script type="text/ecmascript-6">
  import UploadTime from 'components/upload-time/upload-time'

  export default {
    props: ['item'],
    data() {
      return {
//        time: '',
        start: '',
        end: ''
      }
    },
    created() {
    },
    computed: {
      type_name() {
        return this.item.time ? this.item.time[0].name : '选择时间'
      },
      back_item() {
        return this.item
      },
      back_time() {
        return this.end ? this.start + '&' + this.end : this.start
      },
    },
    components: {
      UploadTime

    },
    methods: {
      startTime(time) {
        this.start = +new Date(time) //转换为时间戳
        this._updateData()
      },
      endTime(time) {
        this.end = time
        this._updateData()
      },
      _updateData() {
        this.back_item.new_value = this.back_time
        this.$emit('changeData', this.back_item)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .item
    height 50px
    line-height 49px
    width 100%
    overflow inherit !important
    color $color-text-d
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    .btn
      color #fff
      background #5587d7
      height 38px
      margin-top 6px
      margin-left 5px
      line-height 38px
      padding 0 18px
      cursor pointer
    .content
      width 100%
    .text
      height 38px
      border(#ABADB3)
      padding-left 6px
      box-shadow 0 3px 5px 0 #e0e0e0 inset
      margin-top 6px
    .left
      width 100px
      margin-right 15px
    .red
      color #FF3357
      margin-top 5px
      margin-bottom -5px
      /*line-height 60px*/
      font-size 24px
    .w600
      width 600px
    .w232
      width 232px
    .zIndex
      z-index -1


</style>
