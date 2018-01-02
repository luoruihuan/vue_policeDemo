<template>
  <div class="wrap">
    <job-slider :people="people" :data="data"></job-slider>
    <div class="content_wrapper">
      <div class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
//  import {scroll} from 'common/js/scroll'

  import JobSlider from 'components/job-slider/job-slider'
  export default {
    props: {},
    data () {
      return {
        people: [
          {
            title: '南山',
            id: 0
          },
          {
            title: '桂圆',
            id: 1
          },
          {
            title: '黄贝',
            id: 2
          },
          {
            title: '东门',
            id: 3
          },
          {
            title: '黄水清',
            id: 4
          },
          {
            title: '桂圆',
            id: 5
          }
        ],
        data: {
          "provinceJson": [
            {
              "id": "1975",
              "title": "湖南省",
              "parent": "1"
            },
            {
              "id": "2125",
              "title": "广东省",
              "parent": "1"
            }
          ],
          "cityJson": [
            {
              "id": "2151",
              "title": "深圳市",
              "parent": "2125"
            },
            {
              "id": "2159",
              "title": "珠海市",
              "parent": "2125"
            }
          ],
          "countyJson": [
            {
              "id": "2153",
              "title": "罗湖区",
              "parent": "2151"
            },
            {
              "id": "2154",
              "title": "福田区",
              "parent": "2151"
            },
            {
              "id": "2155",
              "title": "南山区",
              "parent": "2151"
            },
            {
              "id": "21550",
              "title": "斗门区",
              "parent": "2159"
            },
            {
              "id": "21551",
              "title": "金湾区",
              "parent": "2159"
            }
          ],
          "streetJson": [
            {
              "id": "1",
              "title": "东城区打死打伤",
              "parent": "2153"
            },
            {
              "id": "215500",
              "title": "哈哈...",
              "parent": "21550"
            }
          ]
        },
      }
    },
    created(){
//      scroll(0, 0)
//      this.bus.$emit('event', 'hello')
    },
    methods: {},
    components: {
      JobSlider
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .wrap
    overflow hidden
    .content_wrapper
      overflow hidden
      padding 90px 0 0 0
      background $color-background-d
      .content
        width 100%
        margin 0 auto
        border 1px dotted #3b5998

  /*.content_wrapper*/
  /*overflow hidden*/
  /*padding 110px 30px 70px 30px*/
  /*.content*/
  /*width 100%*/
  /*height 900px*/
  /*margin 0 auto*/
  /*border 1px dotted #3b5998*/
</style>
