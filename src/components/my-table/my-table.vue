<template>
  <li class="float_left" style="width: 100%;">
    <ul v-show="item.isShowRight" class="clearfix item">
      <li class="float_right">
        <span class="float_right right_font pointer">导出</span>
        <span class="float_right right_font pointer" @click='toggleModal'>新增</span>
      </li>
    </ul>
    <ul class="clearfix item title">
      <label>
        <li class="float_left check center"><input type="checkbox"></li>
      </label>
      <li class="float_left time w10 center">{{item.lists_header[0]}}</li>
      <li class="float_left title w15 center">{{item.lists_header[1]}}</li>
      <li class="float_left person w15 center">{{item.lists_header[2]}}</li>
      <li class="float_left pub_time w15 center">{{item.lists_header[3]}}</li>
      <li class="float_left event w15 center">{{item.lists_header[4]}}</li>
      <li class="float_left org w15 center">{{item.lists_header[5]}}</li>
      <li class="float_left write_person w10 center">{{item.lists_header[6]}}</li>
    </ul>
    <ul class="clearfix item list" v-for="(v,i) in tab_data">
      <label>
        <li class="float_left check center"><input type="checkbox"></li>
      </label>
      <li class="float_left w10 time center">{{v.createDt | formatTime}}</li>
      <li class="float_left w15  fontomit">{{v.pageTitle}}</li>
      <li class="float_left w15 pub_time center">{{v.pagePubDt | formatTime}}</li>
      <li class="float_left w15 person center fontomit">{{v.siteName}}</li>
      <li class="float_left w15 event fontomit">{{v.pageKeywords}}</li>
      <li class="float_left w15 org center fontomit">{{v.addDeptName}}</li>
      <li class="float_left w10 write_person center fontomit">{{v.addUserName}}</li>
    </ul>
    <!--<PageTurn :totalPage="totalPage" @changePage="changePage"></PageTurn>-->
  </li>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import PageTurn from 'components/page-turn/page-turn'
  export default {
    props: ['item'],
    data () {
      return {
        tab_data: [],
        totalPage: 40
      }
    },
    computed: {
      ...mapState([
        'domain',
        'modal_flag'
      ])
    },
    created () {
      this.getTableLists()
    },
    watch: {
      'modal_flag': {
        handler: function(newVal, oldVal) {
          this.getTableLists()
        },
        deep: true
      }
    },
    methods: {
      toggleModal () {
        //新增跳转到type2
        let id = this.modal_flag.id
        console.log(id)
        let flag_obj = {
          type: 2,
          id: id
        }
        this.$store.commit('changeModal_flag', flag_obj)
        this.bus.$emit('toggleModal')
      },
      getTableLists (val=0) {
        let path = this.$route.path
        if(path.trim() == '/archives/texture-ledger') {
          if(this.modal_flag.type==3) {
            //id = this.modal_flag.id
            let url = `${this.domain}ledger/organ/pubInfoList`
            let params = {
              "limit": 5,
              "offset": 1,
              "organId":24
            }
            this.axios.post(url,params).then(res => {
              console.log(111111)
              console.log(res.data.data)
              this.totalPage = res.data.data.pages
              this.tab_data = res.data.data.dataInfo
            }).catch(err => {
              console.log(err)
            })
          }

        }
      },
      changePage(val) {
//        this.getTableLists(val)
      }
    },
    components: {
      PageTurn
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .item
    line-height 49px
    overflow hidden
    color #342626
    text-align center
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    .right_font
      width: 60px
      height: 25px
      line-height: 25px
      color: #5587d7
      border(#5587d7)
      font-size 14px
      text-align center
      border-radius 4px
      font-family "Microsoft YaHei"
      margin 10px 0px 10px 5px
    .w10
      width 10%
    .w15
      width 15%
    /*.check*/
      /*width 5%*/
    /*.title*/
      /*width 25%*/
    /*.event*/
      /*width 15%*/
    /*.pub_time*/
      /*width 20%*/
    /*.time, .person, .write_person, .org*/
      /*width 10%*/
    &.title
      background #F2F2F2
      li
        font-weight bold
        font-family SimSun
    &.list
      .title, .event, .pub_time, .write_person, .org
        padding 0 10px
      &:nth-child(odd)
        background-color: #FAFAFA;
      .title
        color $color-sub-theme
</style>
