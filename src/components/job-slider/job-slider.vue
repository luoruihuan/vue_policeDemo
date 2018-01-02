<template>
  <div class="slider_wrapper float_left" :class="{back:isBack}">
    <div class="slider" :class="{back:isBack}">
      <transition name="slider-fade">
        <div v-show="!isBack" class="tab">
          <!--tab栏切换-->
          <div class="slider_tabs clearfix">
            <router-link tag="span" to="/assessment/duty-unit"
                         class="iconfont center icon-other slider_tab left float_left pointer">
              责任单位
            </router-link>
            <router-link tag="span" to="/assessment/duty-personnel"
                         class="iconfont center icon-ren slider_tab right float_right pointer">
              责任人员
            </router-link>
          </div>
          <!--tab切换内容-->
          <div>
            <div class="slider_tab_comp">
              <!--搜索框-->
              <div class="slider_search">
                <input type="text" class="slider_search_left" placeholder="搜索">
                <span class="slider_search_right icon center pointer iconfont icon-sousuo"></span>
              </div>
              <!--层级关系-->
              <div class="slider_nth">
                <span class="slider_first pointer" @click="getCity">{{province}}<span class="icon iconfont icon-xiangyoujiantou"></span></span>
                <span v-show="city.city" class="slider_first pointer" @click="getCounty">{{city.city}}<span
                  class="icon iconfont icon-xiangyoujiantou"></span></span>
                <span v-show="county.county" class="slider_first pointer" @click="getStreet">{{county.county}}<span
                  class="icon iconfont icon-xiangyoujiantou"></span></span>
              </div>
              <ul class="slider_content">
                <li class="menu_item current pointer" :class="{active:!isLast}">{{currentPosition}}</li>
                <li @click="getData($event, item)" class="menu_item pointer clearfix" :class="{active: isLast&&item[level]==currentPosition}" v-for="(item, index) in myData">
                  <span class="item">{{item[level]}}<span class="icon iconfont icon-xiangyoujiantou float_right"></span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <div v-on:click="backMenu" class="toggle_menu pointer">
        <span class="iconfont" :class="{'icon-shuangjiantouxia4':isBack, 'icon-shuangjiantouxia3': !isBack}"></span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {fullPathInclude} from 'common/js/logic'
  export default {
    props: ['people', 'data'],
    data () {
      return {
        isBack: false,
        myData: [],
        province: '全省',
        city: '市',
        county: '区/县',
        position: 'city',
        level: 'city',
        isLast: false,
        currentPosition: '全省',
        cityJson: [
          {
            "id": "2",
            "city": "北京市",
            "parent": "1"
          },
          {
            "id": "19",
            "city": "天津市",
            "parent": "1"
          },
          {
            "id": "37",
            "city": "石家庄市",
            "parent": "36"
          },
          {
            "id": "61",
            "city": "唐山市",
            "parent": "36"
          },
          {
            "id": "77",
            "city": "秦皇岛市",
            "parent": "36"
          },
          {
            "id": "86",
            "city": "邯郸市",
            "parent": "36"
          },
          {
            "id": "107",
            "city": "邢台市",
            "parent": "36"
          },
          {
            "id": "128",
            "city": "保定市",
            "parent": "36"
          },
          {
            "id": "155",
            "city": "张家口市",
            "parent": "36"
          },
          {
            "id": "174",
            "city": "承德市",
            "parent": "36"
          }
        ],
        countyJson: [
          {
            "id": "3",
            "county": "东城区",
            "parent": "2"
          },
          {
            "id": "4",
            "county": "西城区",
            "parent": "2"
          },
          {
            "id": "5",
            "county": "朝阳区",
            "parent": "2"
          },
          {
            "id": "6",
            "county": "丰台区",
            "parent": "2"
          },
          {
            "id": "7",
            "county": "石景山区",
            "parent": "2"
          },
          {
            "id": "8",
            "county": "海淀区",
            "parent": "2"
          },
          {
            "id": "9",
            "county": "门头沟区",
            "parent": "2"
          },
          {
            "id": "10",
            "county": "房山区",
            "parent": "2"
          },
          {
            "id": "11",
            "county": "通州区",
            "parent": "2"
          },
          {
            "id": "12",
            "county": "顺义区",
            "parent": "2"
          },
          {
            "id": "13",
            "county": "昌平区",
            "parent": "2"
          },
          {
            "id": "14",
            "county": "大兴区",
            "parent": "2"
          },
          {
            "id": "15",
            "county": "怀柔区",
            "parent": "2"
          },
          {
            "id": "16",
            "county": "平谷区",
            "parent": "2"
          },
          {
            "id": "17",
            "county": "密云县",
            "parent": "2"
          },
          {
            "id": "18",
            "county": "延庆县",
            "parent": "2"
          },
          {
            "id": "18",
            "county": "延庆县",
            "parent": "2"
          },
          {
            "id": "20",
            "county": "和平区",
            "parent": "19"
          },
          {
            "id": "21",
            "county": "河东区",
            "parent": "19"
          },
          {
            "id": "22",
            "county": "河西区",
            "parent": "19"
          },
          {
            "id": "23",
            "county": "南开区",
            "parent": "19"
          },
          {
            "id": "24",
            "county": "河北区",
            "parent": "19"
          },
          {
            "id": "25",
            "county": "红桥区",
            "parent": "19"
          },
          {
            "id": "38",
            "county": "市辖区",
            "parent": "37"
          },
          {
            "id": "39",
            "county": "长安区",
            "parent": "37"
          },
          {
            "id": "40",
            "county": "桥西区",
            "parent": "37"
          },
          {
            "id": "41",
            "county": "新华区",
            "parent": "37"
          },
          {
            "id": "42",
            "county": "井陉矿区",
            "parent": "37"
          },
          {
            "id": "43",
            "county": "裕华区",
            "parent": "37"
          },
          {
            "id": "44",
            "county": "藁城区",
            "parent": "37"
          },
          {
            "id": "45",
            "county": "鹿泉区",
            "parent": "37"
          },
          {
            "id": "46",
            "county": "栾城区",
            "parent": "37"
          }
        ],
        streetJson: [
          {
            "id": "3422",
            "street": "清水河街道",
            "parent": "20"
          },
          {
            "id": "32423",
            "street": "桂圆街道",
            "parent": "20"
          },
          {
            "id": "1423428",
            "street": "黄贝街道",
            "parent": "20"
          },
          {
            "id": "14328",
            "street": "东门街道",
            "parent": "20"
          },
          {
            "id": "14238",
            "street": "南湖街道",
            "parent": "20"
          },
          {
            "id": "15438",
            "street": "笋岗街道",
            "parent": "20"
          },
          {
            "id": "15438",
            "street": "东湖街道",
            "parent": "20"
          },
          {
            "id": "32423",
            "street": "北七家街道",
            "parent": "3"
          },
          {
            "id": "1423428",
            "street": "南七家街道",
            "parent": "3"
          },
          {
            "id": "14328",
            "street": "东门街道",
            "parent": "3"
          },
          {
            "id": "14238",
            "street": "南湖街道",
            "parent": "3"
          },
          {
            "id": "15438",
            "street": "笋岗街道",
            "parent": "3"
          },
          {
            "id": "15438",
            "street": "东湖街道",
            "parent": "3"
          },
          {
            "id": "32423",
            "street": "桂圆街道",
            "parent": "3"
          },
          {
            "id": "1423428",
            "street": "黄贝街道",
            "parent": "3"
          },
          {
            "id": "14328",
            "street": "东门街道",
            "parent": "3"
          },
          {
            "id": "14238",
            "street": "南湖街道",
            "parent": "3"
          },
          {
            "id": "15438",
            "street": "笋岗街道",
            "parent": "3"
          },
          {
            "id": "15438",
            "street": "东湖街道",
            "parent": "3"
          }
        ]
      }
    },
    created () {
      this.myData = this.cityJson
    },
    computed: {
      isCompany () {
        return fullPathInclude(this, '/assessment/duty-unit')
      }
    },
    methods: {
      // 使菜单显示或隐藏
      backMenu () {
        this.isBack = !this.isBack
      },
      getData(e, item) {
        let id = item.id
        let target = item
        this.isLast = true
        this.level = 'street'
//        this.myData = []
        this.position = 'street'
        this.cityJson.forEach((item) => {
          if (item.id == id) {
            this.level = 'county'
            this.position = 'city'
            this.city = target
            this.isLast = false
            this.myData = this.countyJson.filter((item) => {
              return item.parent == id
            }) || ''
            return
          }
        })
        this.countyJson.forEach((item) => {
          if (item.id == id) {
            this.level = 'street'
            this.position = 'county'
            this.county = target
            this.isLast = false
            this.myData = this.streetJson.filter((item) => {
              return item.parent == id
            }) || ''
            return
          }
        })
        this.currentPosition = item[this.position]
      },
      getCity() {
        this.level = 'city'
        this.isLast = false
        this.city = ''
        this.county = ''
        this.currentPosition = '全省'
        this.myData = this.cityJson
      },
      getCounty() {
        this.level = 'county'
        this.isLast = false
        this.county = ''
        this.myData = this.countyJson.filter((item) => {
          return item.parent == this.city.id
        })
        this.currentPosition = this.city.city
      },
      getStreet () {
        this.level = 'street'
        this.isLast = false
        this.myData = this.streetJson.filter((item) => {
          return item.parent == this.county.id
        })
        this.currentPosition = this.county.county
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .slider_wrapper
    font-size 16px
    font-family 'MicrosoftYaHei'
    width 220px
    overflow hidden
    height calc(100vh - 90px)
    transition width .8s
    &.back
      width 10px
    .slider
      width 220px
      height 100vh
      position fixed
      background #578CE4
      top 90px
      z-index 20
      transition width .8s
      &.back
        width 10px
      .tab
        overflow hidden
        &.slider-fade-enter-active, &.slider-fade-leave-active
          transition all .8s
        &.slider-fade-enter, &.slider-fade-leave-active
          opacity 0
        .slider_tabs
          background-color #4778C7
          color #578BE1
          width 220px
          margin-bottom 13px
          padding-top 10px
          .slider_tab
            line-height 44px
            height 44px
            width 50%
            &.router-link-active
              background-color #578CE4
              color #fff
              border-radius 0 10px 0 0
            &.right.router-link-active
              border-radius 10px 0 0 0
        .slider_tab_comp
          .slider_search
            width 200px
            position relative
            border-radius 2px
            overflow hidden
            margin 0 10px
            .slider_search_left
              width 100%
              height 38px
              line-height 38px
              padding-left 20px
              font-size 16px
              border-top 2px solid #BDBDBB
              &::-webkit-input-placeholder
                color #CDCDCD
            .slider_search_right
              color #7C9CCD
              background #fff
              position absolute
              right 0
              top 50%
              height 22px
              font-size $font-size-large
              font-weight bold
              line-height 22px
              width 40px
              border-left 1px solid #ddd
              transform translateY(-50%)
          .slider_nth
            width 220px
            margin 0 10px
            padding 16px 10px
            margin-top 8px
            border-bottom 1px dotted #ccc
            .iconfont
              font-size $font-size-small
          .slider_content
            font-size 0
            max-height calc(100vh - 252px)
            overflow-y auto
            padding-top 10px
            .menu_item
              height 45px
              line-height 45px
              width 220px
              padding 0 10px 0 30px
              font-size $font-size-medium-x
              color $color-text
              border-left 6px solid transparent
              &:hover
                background #5484D3
              &.current
                font-size $font-size-large
                font-weight bold
                padding 0 10px 0 20px
              .iconfont
                display none
                font-size $font-size-small
              &.active
                border-left 6px solid #FF9900
                background #5484D3
                .iconfont
                  display block

      .toggle_menu
        position absolute
        right -28px
        top 50%
        z-index 20
        margin-top -100px
        height 130px
        border 14px solid transparent
        border-left 14px solid $color-sub-theme
        span
          position absolute
          left -16px
          top -12px
          color $color-text
          font-size $font-size-medium-x
          line-height 130px
</style>
