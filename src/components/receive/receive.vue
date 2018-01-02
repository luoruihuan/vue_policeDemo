<template>
  <li class="item clearfix float_left">
    <span class="name float_left left">{{item.display_name||item.name}}</span>
    <!--左边-->
    <span class="r_left float_left">

      <div class="org w50" v-for="(i,index) in has_arr">
        {{i.province || i.city || i.county}}
        <span @click="reduceHas_arr($event, index, i)"
              class="icon iconfont icon-cuowu"></span>
      </div>
    </span>
    <!--右边-->
    <span class="r_right float_left">
      <div class="i">{{item.display_name}}列表</div>
      <div class="slider_nth">
        <span class="slider_first pointer" @click="_getProvinces">全国<span
          class="icon iconfont icon-xiangyoujiantou"></span></span>
        <span v-if="province.province" class="slider_first pointer"
              @click="updateLists($event, province)">{{province.province}}<span
          class="icon iconfont icon-xiangyoujiantou"></span></span>
        <span v-if="city.city" class="slider_first pointer" @click="updateLists($event, city)">{{city.city}}<span
          class="icon iconfont icon-xiangyoujiantou"></span></span>
        <!--<span v-if="county.county" class="slider_first pointer">{{county.county}}<span class="icon iconfont icon-xiangyoujiantou"></span></span>-->
      </div>
<!--      <div class="i org pointer">
        <input type="checkbox" v-model="checkAll" @click="handleCheckAll"/>
        <span>全选</span>
      </div>-->
      <div class="i org pointer" v-for="(i, index) in not_arr">
        <input class="check" type="checkbox" :value="i" v-model="has_arr"/>
        <!--:class="{'none_pointer_event':i.event}"-->
        <span class="location" @click="updateLists($event, i)">{{i.province || i.city || i.county}}</span>
      </div>
    </span>
  </li>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'

  export default {
    props: ['item'],
    data() {
      return {
        province: '省',
        city: '市',
//        county: '区/县',
        has_arr: [],
        not_arr: [],
        checkAll: false
      }
    },
    created() {
      this._getProvinces()
    },
    computed: {},
    methods: {
//      setEvent(i, index) {
//        i.event = !i.event
//        this.has_arr.forEach(item => {
//          if(item.id === i.id) {
//            this.pointer_event[index] = true
//          } else {
//            this.pointer_event[index] = false
//          }
//        })
//        console.log(this.pointer_event);
//      },
      _getProvinces() {
        this.province = '省'
        this.city = '市'
//        this.county = '区/县'
        this.axios.get('/api/provinces')
          .then(response => {
            console.log(response);
            this.not_arr = response.data.data
          })
          .catch(error => {
            console.log(error);
          })
      },
      reduceHas_arr(e, index, i) {
        this.updateLists(e, i)
        this.has_arr.splice(index, 1)
      },
//      handleCheckAll() {
//        if (this.checkAll) {
//          let not = JSON.parse(JSON.stringify(this.not_arr))
//          this.has_arr = not
//          console.log(this.has_arr);
//        } else {
//          this.has_arr = []
//          let has = this.has_arr.concat(this.not_arr)
//          for (let i = 0; i < has.length; i++) {
//            let item = has.shift()
//          }
//        }
//      },
      updateLists(e, i) {
        this.checkAll = false
        if (i.province) { // 请求市
          this.province = i
          let id = i.id
          this.city = '市'
//          this.county = '区/县'
          this.axios.get(`/api/cities?provinceID=${id}`)
            .then(response => {
              this.not_arr = response.data.data
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            })
        }
        if (i.city) { // 请求县
          this.city = i
          let id = i.id
//          this.county = '区/县'
          this.axios.get(`/api/counties?cityID=${id}`)
            .then(response => {
              this.not_arr = response.data.data
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            })
        }
//        this.county = i
      }
    },
    watch: {
//      has_arr() {
//        if (this.has_arr.length === this.not_arr.length && this.has_arr[0].id === this.not_arr[0].id) {
//          this.checkAll = true
//        } else {
//          this.checkAll = false
//        }
//      }
      /*,
      checkAll() {
        if (this.checkAll) {
          this.has_arr.concat(this.not_arr)
        } else {
          this.has_arr = []
        }
      }*/
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
    width 100%
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    .left
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
      .slider_nth
        margin 0 10px
        padding 6px 10px
        border-bottom 1px dotted #ccc
        .iconfont
          font-size $font-size-small
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
          .check
            extend-click()
          .location
            display inline-block
            width 92%
</style>
