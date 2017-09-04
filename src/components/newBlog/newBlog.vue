<template>
  <div class="newBlog">
    <editor></editor>
  </div>
</template>

<script type="text/ecmascript-6">
  import editor from '../../base/editor/editor.vue'
  export default {
    components: {
      editor
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .newBlog
    width: 100%
    height:100%
</style>
