<template>
  <li class="item clearfix float_left center" v-if="item.menus_arr">
    <!--@click="clickHandle"-->
    <input class="btn" :data-type="v.event" :id="i" :type="v.event == 'post' ? 'submit': 'button' "
           v-for="(v,i) in item.menus_arr" :key="i" :value="v.name" @click="clickHandle">
    <modal :modal="modal" :width="'1000'" :top="'5%'" v-on:hideModal="modal = false">
      <span slot="title">舆情处理</span>
      <div slot="content" class="modal_content clearfix">
        <my-add :form_lists="form_lists" @changeData="getChangeData"/>
      </div>
    </modal>
  </li>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import Modal from 'components/modal/modal'
  import MyAdd from 'components/my-add/my-add'
  export default {
    props: ['item'],
    data () {
      return {
        modal: false,
        form_lists: [],
        post_data: {}
      }
    },
    created () {
      this.getChangeData()
    },
    computed: {
      ...mapState([
        'domain',
        'modal_data_list',  //提交表单数据列表
        'modal_flag', //标记弹窗
      ])
    },
    methods: {
      ...mapActions([
        'clearModal_data_list'
      ]),
      getChangeData (val) {
        if(val) {
          this.post_data[val.name] = val.val
        }
      },
      //提交数据
      clickHandle(e) {
        e = e || window.event
        let path = this.$route.path
        let data = this.modal_data_list //弹窗表单数据
        if (e.target.dataset.type === 'post') {
          if(path.trim() == '/archives/texture-ledger') { //重点组织
            if(this.modal_flag.type == 1) {
              console.log(data)
              let params = {}
              params['organInfo'] = {}
              params['organInfo']['organAddr'] = data['organAddr']
              params['organInfo']['organCreate'] = data['organCreate']
              params['organInfo']['organId'] = data['organId']
              params['organInfo']['organName'] = data['organName']
              params['organInfo']['peopleList'] = data['peopleList']
              params['pubInfoVo'] = {}
              params['pubInfoVo']['accountList'] = data['accountList']
              params['pubInfoVo']['authorAccountId'] = data['authorAccountId']
              params['pubInfoVo']['authorId'] = data['authorId']
              params['pubInfoVo']['authorNickname'] = data['authorNickname']
              params['pubInfoVo']['authorOnlineAddr'] = data['authorOnlineAddr']
              params['pubInfoVo']['eventList'] = data['eventList']
              params['pubInfoVo']['organList'] = data['organList']
              params['pubInfoVo']['pageCont'] = data['pageCont']
              params['pubInfoVo']['pageKeywords'] = data['pageKeywords']
              params['pubInfoVo']['pagePeriodical'] = data['pagePeriodical']
              params['pubInfoVo']['pagePubDt'] = data['pagePubDt']
              params['pubInfoVo']['pageTitle'] = data['pageTitle']
              params['pubInfoVo']['regionList'] = data['regionList']
              params['pubInfoVo']['remark'] = data['remark']
              //params['pubInfoVo']['websiteId'] = data['websiteId']
              console.log(data)
              console.log(params)
              let url = `${this.domain}ledger/organ/add`
              this.axios.post(url,params).then(res => {
                alert('成功')
                console.log(res)
              }).catch(err => {
                console.log('失败')
                console.log(err)
              })
              this.clearModal_data_list()
            }else if(this.modal_flag.type == 2) {  //新增信息
              let id = this.modal_flag.id
              let url = `${this.domain}ledger/organ/add/${id}`
              let params = this.modal_data_list
              //websiteId传参数为num
              params['websiteId'] = params['websiteId'][0]
              this.axios.post(url,params).then(res => {
                if(res.status == 200) {
                  alert('成功')
                }
              }).catch(err => {
                console.log(err)
              })
            }
          }
          //console.log('一个ajax请求')
          //alert('保存成功')
        }
        if (e.target.dataset.type === 'close') {
          console.log('取消修改')
          alert('放弃更改')
        }
        if (e.target.dataset.type === 'jump') {
          console.log('跳转到业务流转页面')
          this.$router.push('/business')
        }
        if (e.target.dataset.type == 'showModal') {
          console.log('出现一个弹窗')
          this.modal = true
          if (e.target.id == 0) {
            this.form_lists = [
              {
                type: 'MyTitle',
                name: '编报',
                percentage: '100%',
                isEdit: false
              },
              {
                type: 'MySpan',
                name: '稳空',
                isMulti: false,
                isRequired: false,
                value: '',
                percentage: '100%',
              },
              {
                type: 'MySpan',
                name: '反馈日期',
                value: '2017-6-6',
                percentage: '50%',
                isRequired: false,
                disabled: true
              },
              {
                type: 'ImportantSearch',
                name: '所在平台',
                percentage: '50%',
                isRequired: true,
                btnValue: '重点人库查询',
                value: ''
              },
              {
                type: 'MySelect',
                name: '责任落实',
                isMulti: false,
                percentage: '100%',
                isRequired: true,
                value: '',
                selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
              },
              {
                type: 'MyInput',
                name: '备注',
                value: '',
                percentage: '100%',
                isRequired: false,
                disabled: false
              },
              {
                type: 'MySpan',
                name: '单条',
                isMulti: false,
                isRequired: false,
                value: '',
                percentage: '100%',
              },
              {
                type: 'MySpan',
                name: '反馈日期',
                value: '2017-6-6',
                percentage: '50%',
                isRequired: false,
                disabled: true
              },
              {
                type: 'ImportantSearch',
                name: '所在平台',
                percentage: '50%',
                isRequired: true,
                btnValue: '重点人库查询',
                value: ''
              },
              {
                type: 'MySelect',
                name: '责任落实',
                isMulti: false,
                percentage: '100%',
                isRequired: true,
                value: '',
                selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
              },
              {
                type: 'MyInput',
                name: '备注',
                value: '',
                percentage: '100%',
                isRequired: false,
                disabled: false
              }
            ]
          } else if (e.target.id == 1) {
            this.form_lists = [
              {
                type: 'MyTitle',
                name: '落地调查',
                percentage: '100%',
                isEdit: false
              },
              {
                type: 'MySpan',
                name: '查身份',
                isMulti: false,
                isRequired: false,
                value: '',
                percentage: '100%',
              },
              {
                type: 'MySpan',
                name: '反馈日期',
                value: '2017-6-6',
                percentage: '50%',
                isRequired: false,
                disabled: true
              },
              {
                type: 'ImportantSearch',
                name: '所在平台',
                percentage: '50%',
                isRequired: true,
                btnValue: '重点人库查询',
                value: ''
              },
              {
                type: 'MySelect',
                name: '责任落实',
                isMulti: false,
                percentage: '100%',
                isRequired: true,
                value: '',
                selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
              },
              {
                type: 'MyInput',
                name: '备注',
                value: '',
                percentage: '100%',
                isRequired: false,
                disabled: false
              },
              {
                type: 'MySpan',
                name: '稳空',
                isMulti: false,
                isRequired: false,
                value: '',
                percentage: '100%',
              },
              {
                type: 'MySpan',
                name: '反馈日期',
                value: '2017-6-6',
                percentage: '50%',
                isRequired: false,
                disabled: true
              },
              {
                type: 'ImportantSearch',
                name: '所在平台',
                percentage: '50%',
                isRequired: true,
                btnValue: '重点人库查询',
                value: ''
              },
              {
                type: 'MySelect',
                name: '责任落实',
                isMulti: false,
                percentage: '100%',
                isRequired: true,
                value: '',
                selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
              },
              {
                type: 'MyInput',
                name: '备注',
                value: '',
                percentage: '100%',
                isRequired: false,
                disabled: false
              },
              {
                type: 'MyBtn'
              }
            ]
          } else if (e.target.id == 2) {
            this.form_lists = [
              {
                type: 'MyTitle',
                name: '信息处置',
                percentage: '100%',
                isEdit: false
              },
              {
                type: 'MySpan',
                name: '删除',
                isMulti: false,
                isRequired: false,
                value: '',
                percentage: '100%',
              },
              {
                type: 'MySpan',
                name: '反馈日期',
                value: '2017-6-6',
                percentage: '50%',
                isRequired: false,
                disabled: true
              },
              {
                type: 'MySelect',
                name: '责任落实',
                isMulti: false,
                percentage: '100%',
                isRequired: true,
                value: '',
                selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
              },
              {
                type: 'MyInput',
                name: '备注',
                value: '',
                percentage: '100%',
                isRequired: false,
                disabled: false
              },
              {
                type: 'MySpan',
                name: '过滤',
                isMulti: false,
                isRequired: false,
                value: '',
                percentage: '100%',
              },
              {
                type: 'MySpan',
                name: '反馈日期',
                value: '2017-6-6',
                percentage: '50%',
                isRequired: false,
                disabled: true
              },
              {
                type: 'MySelect',
                name: '责任落实',
                isMulti: false,
                percentage: '100%',
                isRequired: true,
                value: '',
                selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
              },
              {
                type: 'MyInput',
                name: '备注',
                value: '',
                percentage: '100%',
                isRequired: false,
                disabled: false
              },
              {
                type: 'MySpan',
                name: '屏蔽',
                isMulti: false,
                isRequired: false,
                value: '',
                percentage: '100%',
              },
              {
                type: 'MySpan',
                name: '反馈日期',
                value: '2017-6-6',
                percentage: '50%',
                isRequired: false,
                disabled: true
              },
              {
                type: 'MySelect',
                name: '责任落实',
                isMulti: false,
                percentage: '100%',
                isRequired: true,
                value: '',
                selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
              },
              {
                type: 'MyInput',
                name: '备注',
                value: '',
                percentage: '100%',
                isRequired: false,
                disabled: false
              },
              {
                type: 'MyBtn'
              }
            ]
          } else if (e.target.id == 3) {
            this.form_lists = [
              {
                type: 'MyTitle',
                name: '线索核查',
                percentage: '100%',
                isEdit: false
              },
              {
                type: 'MySpan',
                name: '关注',
                isMulti: false,
                isRequired: false,
                value: '',
                percentage: '100%',
              },
              {
                type: 'MySpan',
                name: '反馈日期',
                value: '2017-6-6',
                percentage: '50%',
                isRequired: false,
                disabled: true
              },
              {
                type: 'MySelect',
                name: '责任落实',
                isMulti: false,
                percentage: '100%',
                isRequired: true,
                value: '',
                selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
              },
              {
                type: 'MyInput',
                name: '备注',
                value: '',
                percentage: '100%',
                isRequired: false,
                disabled: false
              },
              {
                type: 'MySpan',
                name: '核查',
                isMulti: false,
                isRequired: false,
                value: '',
                percentage: '100%',
              },
              {
                type: 'MySpan',
                name: '反馈日期',
                value: '2017-6-6',
                percentage: '50%',
                isRequired: false,
                disabled: true
              },
              {
                type: 'MySelect',
                name: '责任落实',
                isMulti: false,
                percentage: '100%',
                isRequired: true,
                value: '',
                selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
              },
              {
                type: 'MyInput',
                name: '备注',
                value: '',
                percentage: '100%',
                isRequired: false,
                disabled: false
              },
              {
                type: 'MyBtn'
              }
            ]
          } else if (e.target.id == 4) {
            this.form_lists = [
              {
                type: 'MyTitle',
                name: '其他',
                percentage: '100%',
                isEdit: false
              },
              {
                type: 'MySpan',
                name: '其他',
                isMulti: false,
                isRequired: false,
                value: '',
                percentage: '100%',
              },
              {
                type: 'MySpan',
                name: '反馈日期',
                value: '2017-6-6',
                percentage: '50%',
                isRequired: false,
                disabled: true
              },
              {
                type: 'MySelect',
                name: '责任落实',
                isMulti: false,
                percentage: '100%',
                isRequired: true,
                value: '',
                selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
              },
              {
                type: 'MyInput',
                name: '备注',
                value: '',
                percentage: '100%',
                isRequired: false,
                disabled: false
              },
              {
                type: 'MyBtn'
              }
            ]
          }
        }
      }
    },
    components: {
      MyAdd,
      Modal
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .item
    line-height 49px
    overflow hidden
    border-radius 0 0 8px 8px / 0 0 8px 8px
    position absolute
    bottom 0
    left 0
    right 0
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    height 70px
    background #EEF3FB
    .btn
      display inline-block
      background $color-sub-theme
      line-height 30px
      margin 0 30px
      height 30px
      padding 0 15px
      border-radius 4px
      color $color-text
      margin-top 18px
      &:hover
        background #5276C3
      &.close
        background #CFD9E9
        color $color-text-d
        &:hover
          background #cad3e3
</style>
