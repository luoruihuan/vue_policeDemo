<template>
  <div class="position">
    <span class="iconfont icon-coordinates_fill">
    </span>
      当前位置：
    <span v-for="p in p_arr" class="pointer" @click="history">{{p}}
    <span class="iconfont icon-xiangyoujiantou position_lis" style="font-size: 12px"></span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        isHide: true
      }
    },
    props: ['p_arr'],
    methods: {
      history (e) {
        e = e || window.event
        if(this.p_arr.length===4) {
//          console.log(e.target.innerText.trim(), this.p_arr[2].trim())
          if(e.target.innerText.trim() == this.p_arr[2].trim()) {
            this.$emit('sendIsHide',this.isHide)
            this.p_arr.splice(3,1)
          }
        }
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  /*定位position*/
  .position
    color #999
    font-size 16px
    height 50px
    display inline-block
    span, span:before
      display inline-block
      line-height 50px
</style>
