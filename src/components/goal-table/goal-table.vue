<template>
  <div>
    <div class="goalbox">
      <div class='goal_image'></div>
      <table>
        <tr>
          <td v-for="i in 27" :class='{goal:i>23}'></td>
        </tr>
        <tr>
          <td v-for="i in 27" :class='{goal:i>23}'></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        goal: 81.5
      }
    },
    methods: {},

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .goalbox
    width 100%
    height 34px
    position relative
    background-image linear-gradient(90deg, #2bd9af, #39dbab, #4adea5, #5ee09e, #75e397, #8de68f, #a2e986, #b8ec7d, #c9ed73, #d8ed6b, #e3ed63, #eeed5c, #f6ed54, #fbed4f, #fbea4b, #fbde47, #fbc943, #fbbb43, #fbad42, #fdb444, #fb9d42, #fb8d42, #fb7c42, #fb6c42, #f95f42, #f95542)
    @media screen and (max-width: 1366px)
      &
        height: 27px
        width: 90%
        left 5%
    table
      height calc(100% - 4px)
      width calc(100% - 2px)
      position absolute
      top 1px
      left 1px
      td
        border 2px solid #10284F
        &.goal
          background-color #2B64A4

    .goal_image
      width 16px
      height 27px
      background-image url(./Pointer.png)
      position absolute
      top -27px
      left 75%

</style>
