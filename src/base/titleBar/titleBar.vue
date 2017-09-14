<template>
  <div class="titleBar">
    {{text}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .titleBar
    width: 100%
    height:40px
    line-height :40px
    padding-left:16px
    border-left:4px solid #0aa89e
    background-color: #e5e6e6
    color :#313534
    margin-bottom:40px
    font-size:20px
</style>
