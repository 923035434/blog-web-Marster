<template>
  <div id="app">
    <home-page></home-page>
  </div>
</template>

<script>
  import home from './components/home/home.vue'
  export default{
    components: {
      'home-page': home
    }
}
</script>

<style>
@import "common/stylus/reset.css";
@import "~quill/dist/quill.snow.css";
@import "~highlight.js/styles/monokai-sublime.css";
</style>
