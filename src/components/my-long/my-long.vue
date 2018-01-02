<template>
  <li class="com_div clearfix platform" :style='{width: item.percentage}'>
            <span class="left_d float_left clearfix">
              <span class="span1 float_left">{{item.name}}</span>
            </span>
    <span class="right_d float_left clearfix">
               <span :id="lists.id" class="platform_list clearfix">
                <input type="text" placeholder="平台名称" class="input input_s float_left" v-model="lists.name">
                <input type="text" placeholder="请输入该平台域名" class="input input_c float_left" v-model="lists.platformName">
                <span @click="add()" class="float_left icon center pointer">+</span>
                <input type="button" class="center pointer float_left keyNet button" @click="getData"
                       value="重点网站查重">
              </span>
              <span :id="i.id" v-for="(i,index) in item.list_arr" class="platform_list clearfix">
                <input type="text" placeholder="平台名称" class="input input_s float_left" v-model="i.name">
                <input type="text" placeholder="请输入该平台域名" class="input input_c float_left" v-model="i.platformName">
                <span @click="reduce($event,i,index)" class="float_left icon center pointer">-</span>
              </span>
            </span>
    <!--模态框-->
    <modal :modal="modal_btn" :width="'1000'" :top="'20%'" v-on:hideModal="modal_btn = false">
      <span slot="title">网站{{item.name}}</span>
      <div slot="content" class="modal_content clearfix">
        <ul class="items clearfix">
          <my-receive v-on:changeData="_updateData" :item="receive_item" :has_arr="has_arr"></my-receive>
          <my-btn v-on:hideModal="modal_btn = false" @sendData="sendData"></my-btn>
        </ul>
      </div>
    </modal>
  </li>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import Modal from 'components/modal/modal'
  //  import Receive from 'components/receive/receive'
  import MyReceive from 'components/my-receive/my-receive'
  import MyBtn from 'components/my-btn/my-btn'
  export default {
    data () {
      return {
        has_arr: [], //清空
        lists: {
          name: '',
          platformName: '',
          id: ''
        },
        new_arr: [],
        modal_btn: false,
        post_data: {},
        form_lists: [],
        receive_item: {
          type: 'Receive',
          percentage: '100%',
          isSingle: true, //单选
          name: '涉及' + this.item.name,
          isRequired: false,
          value: []
        }
      }
    },
    props: ['item'],
    computed: {
      ...mapState([
        'domain'
      ]),
      back_item () {
        return this.item
      }
    },
    watch: {
      receive_item: {
        handler: function (newVal, oldVal) {
          console.log(newVal)
          let flag = this.flag_impotrant
          if (flag.length) {
            if (flag[0]['siteName']) { //重点网站查重
              let arr_name = [], arr_platformName = []
              Array.from(this.receive_item.value).forEach(v => {
                arr_name.push(v['siteName'])   //平台名
                arr_platformName.push(v['siteDomain']) //网址
              })
              this.lists.name = arr_name.join('&')
              this.lists.platformName = arr_platformName.join('&')
            }
          }
        },
        deep: true
      }
    },
    methods: {
      add(){
        if (this.lists.name != '') {
          this.item.list_arr.push({name: this.lists.name, platformName: this.lists.platformName, id: this.lists.id})
          this.lists.name = ''
          this.lists.platformName = ''
          this.back_item.new_value = this.has_arr
          console.log(this.back_item.new_value)
          let obj = {}
          let arr = [] //拷贝
          if (this.back_item.new_value.length) {
            for (let key in this.back_item.new_value) {
              arr[key] = this.back_item.new_value[key]
            }
            for (let k in this.back_item) {
              obj[k] = this.back_item[k]
            }
          }
          arr.forEach(v => {
            if (v.peopleId) {
              this.new_arr.push(v.peopleId)
            } else if (v.siteLangDicid) {
              this.new_arr.push(v.siteLangDicid)
            } else if (v.activeDicid) {
              this.new_arr.push(v.activeDicid)
            } else if (v.ledgerId) {
              this.new_arr.push(v.ledgerId)
            }
          })
          obj['new_value'] = this.new_arr
          this.$emit('changeData', obj)
        } else {
          alert('请输入平台信息！')
        }
      },
      reduce(e, i, index){
        this.item.list_arr.splice(index, 1)
        let data = {
          name: this.item.name,
          val: this.item.list_arr
        }
        this.$emit('changeData', data)
      },
      getData(e) {
        e = e || window.event
        this.has_arr = []
        this.modal_btn = !this.modal_btn
        this.form_lists = [
          {
            type: 'Receive',
            percentage: '100%',
            name: '责任地州',
            isRequired: false,
            value: '',
            selects: [
              {
                name: '百度贴吧',
                platformName: 'www.tieba.com',
                id: 0
              }, {
                name: '腾讯微博',
                platformName: 'www.qqblog.com',
                id: 1
              }, {
                name: '今日头条',
                platformName: 'www.toutiao.com',
                id: 2
              }, {
                name: '网易新闻',
                platformName: 'www.wynews.com',
                id: 3
              }, {
                name: '腾讯快报',
                platformName: 'www.qqkuaibao.com',
                id: 4
              }, {
                name: '知乎论坛',
                platformName: 'www.zhihu.com',
                id: 5
              }
            ]
          },
          {
            type: 'MyBtn',
          }
        ]
        let str = e.target.value
        let reg = /网/g
        if (reg.test(str)) { //重点网站
          let url = `${this.domain}ledger/website/list?query=null&fields=siteLangDicid%2CsiteDomain%2CsiteName&sortby=null&order=null&paging=0&limit=0&offset=0`
          this.axios.get(url).then(res => {
            this.sendData('ledgerId')
            this.flag_impotrant = res.data.data
            let obj = []
            for (let key in res.data.data) {
              obj.push(res.data.data[key]['siteLangDicid'])
            }
            this.$store.commit('changeImportant_lists', obj)
            this.$store.commit('changeImportant_send_lists', res.data.data)
          }).catch(err => {
            console.log(err)
          })
        }
      },
      _updateData(val) {
        if (val) {
          this.receive_item.value = val.val
        }
      },
      sendData(id) {
        //this.back_item.new_value = this.has_arr
//        this.back_item.new_value = this.item.list_arr
//        let obj = {}
//        let arr = [] //拷贝
//        let new_arr = [] //存放ID
//        if(this.back_item.new_value.length) {
//          for(let key in this.back_item.new_value) {
//            arr[key] = this.back_item.new_value[key]
//          }
//          for(let k in this.back_item) {
//            obj[k] = this.back_item[k]
//          }
//        }
//        arr.forEach(v => {
//          if(v.peopleId) {
//            new_arr.push(v.peopleId)
//          }else if(v.siteLangDicid) {
//            new_arr.push(v.siteLangDicid)
//          }else if(v.activeDicid) {
//            new_arr.push(v.activeDicid)
//          }else if(v.ledgerId) {
//            new_arr.push(v.ledgerId)
//          }
//        })
//        obj['new_value'] = new_arr
//        console.log(3333333333333333)
//        console.log(obj)
//        this.$emit('changeData', obj)
      }
    },
    components: {
      Modal,
      //Receive,
      MyReceive,
      MyBtn
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .com_div
    width 100%
    margin-bottom 20px
    /*height 50px*/
    border-bottom 1px solid #eee
    overflow hidden
    .ic-font
      font-size 12px
    .else_btn
      margin-left 0
    .tab_d
      margin-top 10px
    .person_sty
      padding 1px 17.5px
    .input
      height 38px
      border(#aaa)
      box-shadow 3px 3px 5px 0 #e0e0e0 inset
      color #000
      padding-left 10px
      margin-top 6px
    .button
      border($color-sub-theme)
      color $color-text
      background #89baf0
      line-height 34px
      margin 6px 0 0 5px
      padding 1px 11px
      &:hover
        background #7bace3
    .input_s
      width 120px
    .input_c
      margin-left 5px
      margin-right 5px
      width 240px
    .input_l
      width 550px
    .icon
      width: 38px
      height: 38px
      margin-top 6px
      text-align center
      line-height: 38px
      font-weight bold
      color #537ED1
      border(#6C99D4)
    .keyNet
      width: 114px
    .span1
      line-height 49px
      color $color-text-d
    .span2
      color #ff3357
      margin-top 15px
      font-size 24px
    .span3
      line-height 49px
      color $color-text-d
    .left_d
      width 115px
    /*margin-right 25px*/
    .left_dd
      width 140px
    .right_d
      line-height 49px
    .one, .two
      width 50%
    .textarea
      width 550px
      background #fbfbfb
      margin-top 6px
      resize none
      border(#aaa)
      line-height 20px
      padding 10px
      font-family Microsoft YaHei
    .time
      position relative
      border(#aaa)
      width 180px
      height 38px
      line-height 36px
      color $color-text-l
      padding-left 10px
      margin-top 6px
</style>
