<template>
  <ul class="items clearfix">
    <component @changeData="getChangeData" v-for="(item, index) in form_lists" :item='item' :is="setType(item)"
               :key="index"></component>
  </ul>
</template>

<script type="text/ecmascript-6">
  import Modal from 'components/modal/modal'
  import AddPerson from 'components/add-person/add-person'
  import MyInput from 'components/my-input/my-input'
  import MyWholeinput from 'components/my-wholeinput/my-wholeinput'
  import MySelect from 'components/my-select/my-select'
  import MyTextarea from 'components/my-textarea/my-textarea'
  import MySpan from 'components/my-span/my-span'
  import MyEnclosure from 'components/my-enclosure/my-enclosure'
  import MyTable from 'components/my-table/my-table'
  import Receive from 'components/receive/receive'
  import ImportantSearch from 'components/important-search/important-search'
  import MyTime from 'components/my-time/my-time'
  import MyTitle from 'components/my-title/my-title'
  import MyLong from 'components/my-long/my-long'
  import MySex from 'components/my-sex/my-sex'
  import MyManage from 'components/my-manage/my-manage'
  import MyArea from 'components/my-area/my-area'
  import MyImg from 'components/my-img/my-img'
  import Bottom from 'components/bottom/bottom' //表单最下面按钮
  import MySecondtitle from 'components/my-secondtitle/my-secondtitle'

  export default {
    props: ['form_lists'],
    data () {
      return {
//        modalOne: false,
//        post_data: {}
      }
    },
    created () {},
    methods: {
      setType (item) {
        if (item.type == 'MySpan') return 'MySpan'
        if (item.type == 'AddPerson') return 'AddPerson'
        if (item.type == 'MyTextarea') return 'MyTextarea'
        if (item.type == 'MyEnclosure') return 'MyEnclosure'
        if (item.type == 'MyTable') return 'MyTable'
        if (item.type == 'ImportantSearch') return 'ImportantSearch'
        if (item.type == 'MyTitle') return 'MyTitle'
        if (item.type == 'MyLong') return 'MyLong'
        if (item.type == 'MyWholeinput') return 'MyWholeinput'
        if (item.type == 'MySex') return 'MySex'
        if (item.type == 'MyHardrank') return 'MyHardrank'
        if (item.type == 'MyManage') return 'MyManage'
        if (item.type == 'MyImg') return 'MyImg'
        if (item.type == 'Bottom') return 'Bottom'
        if (item.type == 'MyArea') return 'MyArea'
        if (item.type == 'MySecondtitle') return 'MySecondtitle'
        if (item.type == '0') return 'MyInput'
        if (item.type == '1') return 'MyInput'
        if (item.type == '2') return 'MyTime'
        if (item.type == '3') return 'MySelect'
        if (item.type == '4') return 'Receive'
        if (item.type == '5') return 'Receive'
        if (item.type == '6') return 'Receive'
        if (item.type == '7')  return 'Receive'
        if (item.type == 'MyInput') return 'MyInput'
        if (item.type == 'MyTime') return 'MyTime'
        if (item.type == 'MySelect')  return 'MySelect'
        if (item.type == 'MyArea') return 'MyArea'
        if (item.type == 'Receive')  return 'Receive'
      },
      getChangeData (data) {
        this.$emit("changeData", data)
      }
    },
    components: {
      Modal,
      AddPerson,
      Receive,
      MyInput,
      MySelect,
      MyTextarea,
      MySpan,
      MyEnclosure,
      MyTable,
      ImportantSearch,
      MyTime,
      MyTitle,
      MyLong,
      MyWholeinput,
      MySex,
      MyManage,
      MyArea,
      MyImg,
      Bottom,
      MySecondtitle
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .items
    padding 0 30px
    border(#cccccc)
</style>
