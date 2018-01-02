<template>
  <div>
    <ul class="items clearfix" v-for="field in fields">
      <my-title :item="field"></my-title>
      <component v-for="(list, index) in field.field_list" :item='list'
                 @changeData="getChangeData"
                 :is="setType(list)"
                 :key="index">
      </component>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import MyTitle from 'components/my-title/my-title'
  import MyInput from 'components/my-input/my-input' // 1半行输入文本√/2整行输入文本√
  import MySelect from 'components/my-select/my-select' // 4半行下拉√/5整行下拉√
  import MyTextarea from 'components/my-textarea/my-textarea' // 3多行输入文本√
  import MySpan from 'components/work-span/work-span'
  // import MySpan from 'components/my-span/my-span' // 0只读√
  import Receive from 'components/receive/receive' // 8半行多项
  import MultiReceive from 'components/receive/receive' // 9多行多项
  import MyTime from 'components/my-time/my-time' // 10日期选择√
  import MultiMyTime from 'components/my-time/my-time' // 11时段选择
  import MultiMySelect from 'components/my-select/my-select' // 6半行级联/7整行级联
  export default {
    props: ['field_list'],
    data() {
      return {}
    },
    computed: {
      fields() {
        return this.field_list
      }
    },
    methods: {
      setType(list) {
//        console.log('hhhhh', list.cpt_type);
        if (list.cpt_type == 0) return 'MySpan'
        if (list.cpt_type == 1 || list.cpt_type == 2) return 'MyInput'
        if (list.cpt_type == 3) return 'MyTextarea'
        if (list.cpt_type == 4 || list.cpt_type == 5) return 'MySelect'
        if (list.cpt_type == 6 || list.cpt_type == 7) return 'MultiMySelect'
        if (list.cpt_type == 8) return 'Receive'
        if (list.cpt_type == 9) return 'MultiReceive'
        if (list.cpt_type == 10) return 'MyTime'
        if (list.cpt_type == 11) return 'MultiMyTime'
      },
      getChangeData(data) {
        console.log(data);
//        this.$emit("changeData", data)
      }
    },
    components: {
      MyTitle,
      MyInput,
      MySelect,
      MyTextarea,
      MySpan,
      Receive,
      MultiReceive,
      MyTime,
      MultiMyTime,
      MultiMySelect
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .items
    padding 0 30px
    border(#cccccc)
    border-top none
</style>
