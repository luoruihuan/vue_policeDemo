<template>
  <div>
    <info v-show="isInfo"></info>
    <report :org="org" v-show="!isInfo"></report>
  </div>
</template>
<script type="text/ecmascript-6">
  import {fullPathInclude} from 'common/js/logic'

  import Info from 'components/91info/91info'
  import Report from 'components/report/report'

  export default {
    props: ['org'],
    data () {
      return { }
    },
    methods: {
    },
     computed: {
      isInfo () {
        return fullPathInclude(this, '91info')
      }
    },
    components: {
      Info,
      Report
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
