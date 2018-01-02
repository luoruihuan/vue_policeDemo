<template>
  <div>
    <my-select></my-select>
    <my-input></my-input>
  </div>
</template>
<script type="text/jsx">
  export default {
    data () {
      return {
        options: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
      }
    },
    render(h) {
      let template = <li></li>
      const TEMPLATE_MAP = {
        mySelect: <my-select></my-select>,
        myInput: <my-input></my-input>,
        myButton: <my-button></my-button>,
        mySpan: <my-span></my-span>
      }
      const DOMType = this.infos.type
      return {}
    },
    props: {
      infos: {
        type: Array,
        required: true
      }
    },
    components: {
      mySelect: {
        render(h) {
          const options = this.$parent.options
          return h(
            'select',
            {
              'class': {
                select: true
              },
              style: {
                color: '#5587d7',
                height: '38px',
                width: '100px',
                fontSize: '30px'
              }
            },
            [
//              Array.apply(null, {length: 20}).map(function () {
              options.map(function (item) {
                return h('option', item)
              })
            ]
          )
        }
      },
      myInput: {
        render(h) {
          return (<input class="text" type="text" value='hello' placeholder="请输入"/>)
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .item
    color $color-sub-theme
    .text
      height 50px
      background $color-sub-theme

  .select
    border 1px solid $color-sub-theme
</style>
