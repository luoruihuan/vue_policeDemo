<template>
  <div class="item">
    <add :form_lists="data_lists" @changeData="getChangeData"></add>
  </div>
</template>

<script type="text/ecmascript-6">
  import {scroll} from 'common/js/scroll'
  import MyTab from 'components/my-tab/my-tab'
  import Add from 'components/add/add'

  export default {
    data () {
      return {
        isInfo: true,
        data_lists: [
          {
            type: 'MyTitle',
            name: '通知详细信息',
            percentage: '100%',
            isEdit: false
          },
          {
            type: 'MySpan',
            name: '报送主题',
            isMulti: false,
            isRequired: false,
            value: '立即全程抓捕',
            percentage: '50%',
          },
          {
            type: 'MySpan',
            name: '报送来源',
            isRequired: true,
            isMulti: false,
            value: '打算的撒的',
            percentage: '50%',
          },
          {
            type: 'MySpan',
            name: '发送内容',
            isMulti: false,
            isRequired: false,
            value: '公安部',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: '报送时间',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '2017.6.6'
          },
          {
            type: 'MySpan',
            name: '线索来源',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '事关地',
            isRequired: false,
            isMulti: true,
            percentage: '50%',
            value: '广州'
          },
          {
            type: 'MySpan',
            name: '初审人',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '核查人',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '审核人',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '上报备注',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MyTitle',
            name: '原始标题',
            percentage: '100%',
            isEdit: false
          },
          {
            type: 'MySpan',
            name: '原标题',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '网站名称',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '信息链接',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '网站类型',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '发帖时间',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '2017.6.6'
          },
          {
            type: 'MySpan',
            name: '信息类别',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '涉事网名',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '涉及事件',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '信息内容',
            isRequired: false,
            isMulti: true,
            percentage: '100%',
            value: '刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳刘佳佳'
          },
          {
            type: 'MyImg',
            name: '网页拷屏',
            isRequired: false,
            percentage: '100%',
            img: [
              {
                url: 'https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
              }
            ]
          },
          {
            type: 'MySpan',
            name: '上报附件',
            isRequired: false,
            isMulti: false,
            percentage: '100%',
            value: '123.MP4'
          },
          {
            type: 'MyTitle',
            name: '信息采分',
            percentage: '100%',
            isEdit: false
          },
          {
            type: 'MyArea',
            percentage: '100%',
            area: {
              name: '信息采分',
              state: '19分',
              time: '（修改分数）'
            },
            content: {
              name: '评语',
              data: [
                {
                  name: '张飞',
                  cont: '123456789456',
                  time: '2017.6.4'
                }
              ]
            },
            file: {
              name: '评语',
              data: ['尽快落实']
            }
          },
          {
            type: 'Bottom',
            percentage: '100%',
            menus_arr: [
              {
                name: '编报',
                event: 'showModal'
              },
              {
                name: '落地调查',
                event: 'showModal'
              },
              {
                name: '信息处理',
                event: 'showModal'
              },
              {
                name: '线索核查',
                event: 'showModal'
              },
              {
                name: '其他',
                event: 'showModal'
              }
            ]
          }
        ],
        post_data: {}
      }
    },
    created () {
      this.getChangeData()
    },
    methods: {
      getChangeData (val) {
        if(val) {
          this.post_data[val.name] = val.val
          console.log(this.post_data)
        }
      },
      showPubOpi (e, val) {
        this.$emit('showPubOpi', val)
      }
    },
    components: {
      MyTab,
      Add
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'

</style>
