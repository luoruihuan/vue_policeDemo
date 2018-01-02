<template>
  <!--翻页-->
  <div class="page_wrapper">
    <ul v-show="totalPage">
      <li :class="{grayColor: page == 1}" class="pointer iconfont icon-zuo" @click="reducePage"></li>
      <li :class="{orangeb: page == i, noborder: i == '...'}" class="pointer page"
          v-for="(i, index) in pages" @click="changePage($event, i)">{{i}}
      </li>
      <li :class="{grayColor: page == totalPage}" class="pointer iconfont icon-you" @click="addPage"></li>
    </ul>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  export default {
    props: ['totalPage'],
    data () {
      return {
        pages: [],
        page: 1
      }
    },
    created () {
      // 初始化页面时
      this._setPagesArr(this.totalPage)
    },
    methods: {
      _setPagesArr (val) {
        this.pages = []
        // 总页数小于16时
        if (val < 14) {
          for (let i = 0; i < val; i++) {
            this.pages.push(i + 1)
          }
        } else {
          // 总页数大于16且当前页小于10时
          if (this.page < 10) {
            for (let i = 0; i < 13; i++) {
              this.pages.push(i + 1)
            }
            this.pages = this.pages.concat(['...', val])
//            this.pages = this.pages.concat(['...'])
          } else {
            // 总页数大于16且当前页大于10时
            let startArr = [1, 2, 3, 4, 5, '...']
            this.pages = this.pages.concat(startArr)
            let endPage = (this.page + 4) > val ? val : (this.page + 4)
            let startPage = (this.page - 3) > (val - 9) ? (val - 9) : (this.page - 3)
            for (let i = startPage; i < endPage; i++) {
              this.pages.push(i + 1)
            }
            if (this.page == val - 5) {
              this.pages = this.pages.concat([val])
//              this.pages = this.pages.concat()
            }
            if (this.page < val - 5) {
              this.pages = this.pages.concat(['...', val])
//              this.pages = this.pages.concat(['...'])
            }
          }
        }
      },
      changePage (event, i) {
        this.page =  i
        this._setPagesArr(this.totalPage)
        this.$emit('changePage', this.page)
      },
      reducePage () {
        this.page--
        this._setPagesArr(this.totalPage)
        this.$emit('changePage', this.page)
      },
      addPage () {
        this.page ++
        this._setPagesArr(this.totalPage)
        this.$emit('changePage', this.page)
      }
    },
    computed: {},
    watch: {
      totalPage () {
        this._setPagesArr(this.totalPage)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  /*上一页 下一页*/
  .page_wrapper
    margin-top 50px
    text-align center
    li
      display inline-block
      width 44px
      line-height 44px
      height 44px
      text-align center
      border 1px solid #999
      border-radius 3px
      box-sizing border-box
      margin-right 8px
      color #666
      font-size $font-size-small
      transition all .5s
      background #fff
      &.orangeb
        background-color #ff9900
        border 1px solid #ff9900
        color #fff
      &.page:hover
        background-color #ff9900
        border 1px solid #ff9900
        color #fff
        transform scale(1.1)
      &.grayColor
        background #e5e5e5
        pointer-events none
      &.noborder
        border none
        color #666
        font-size $font-size-medium-xx
        pointer-events none
        background transparent

  *::selection
    background transparent

</style>
