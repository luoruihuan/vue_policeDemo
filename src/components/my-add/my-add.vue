<template>
  <ul class="items clearfix">

    <component @changeData="getChangeData" v-for="(item, index) in form_lists" :item='item' :is="setType(item)" :key="index"></component>

  </ul>
</template>

<script type="text/ecmascript-6">
  import Modal from 'components/modal/modal'
  import AddPerson from 'components/add-person/add-person'
  import MyInput from 'components/my-input/my-input'
  import MySelect from 'components/my-select/my-select'
  import MyTextarea from 'components/my-textarea/my-textarea'
  import MySpan from 'components/my-span/my-span'
  import MyEnclosure from 'components/my-enclosure/my-enclosure'
  import MyTable from 'components/my-table/my-table'
  import Receive from 'components/receive/receive'
  import ImportantSearch from 'components/important-search/important-search'
  import MyTime from 'components/my-time/my-time'
  import MyTitle from 'components/my-title/my-title'
  import MyArea from 'components/my-area/my-area'
  import MyImg from 'components/my-img/my-img'
  import MyBtn from 'components/my-btn/my-btn'
  import MySecondtitle from 'components/my-secondtitle/my-secondtitle'

  export default {
    props:['form_lists'],
    data () {
      return {
        modalOne: false
//        post_data: {}
      }
    },
    created () {
      this.getChangeData()
    },
    methods: {
      setType (item) {
        if(item.type == 'MyTextarea') {
          return 'MyTextarea'
        }else if(item.type == 'MySpan') {
          return 'MySpan'
        }else if(item.type == 'AddPerson') {
          return 'AddPerson'
        }else if(item.type == 'MyEnclosure') {
          return 'MyEnclosure'
        }else if(item.type == 'ImportantSearch') {
          return 'ImportantSearch'
        }else if(item.type == 'MyTable') {
          return 'MyTable'
        }else if(item.type == 'MyTitle') {
          return 'MyTitle'
        }else if(item.type == 'MyLong') {
          return 'MyLong'
        }else if(item.type == 'MyArea') {
          return 'MyArea'
        }else if(item.type == 'MyImg') {
          return 'MyImg'
        }else if(item.type == 'MyBtn') {
          return 'MyBtn'
        }else if(item.type == 'MySecondtitle') {
          return 'MySecondtitle'
        }else if(item.type == '0') {
          return 'MyInput'
        }else if(item.type == '1') {
          return 'MyInput'
        }else if(item.type == '2') {
          return 'MyTime'
        }else if(item.type == '3') {
          return 'MySelect'
        }else if(item.type == '4') {
          return 'Receive'
        }else if(item.type == '5') {
          return 'Receive'
        }else if(item.type == '6') {
          return 'Receive'
        }else if(item.type == '7') {
          return 'Receive'
        }else if(item.type == 'MyInput') {
          return 'MyInput'
        }else if(item.type == 'MyTime') {
          return 'MyTime'
        }else if(item.type == 'MySelect') {
          return 'MySelect'
        }else if(item.type == 'MyArea') {
          return 'MyArea'
        }else if(item.type == 'Receive') {
          return 'Receive'
        }
      },
      getChangeData (data) {
        if(data) {
          this.$emit("changeData",data)
        }
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
      MyArea,
      MyImg,
      MyBtn,
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
