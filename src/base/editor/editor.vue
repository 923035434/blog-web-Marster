<template>
  <div class="editor">
    <div ref="quillDom" class="quill-editor-wrapper">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    var Quill = require('quill')
    export default {
      data () {
        return {
          editor: {}
        }
      },
      components: {
      },
      mounted () {
        window.hljs.configure({   // optionally configure hljs
          languages: ['html', 'javascript', 'ruby', 'python', 'css']
        })
        this.quillDom = this.$refs.quillDom
        let toolbarOptions = [
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          ['blockquote', 'code-block'],
          [{ 'align': [] }],
          [{'list': 'ordered'}, { 'list': 'bullet' }],
          [{'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['clean']                                         // remove formatting button
        ]
        this.editor = new Quill(this.quillDom, {
          modules: { syntax: true, toolbar: toolbarOptions },
          theme: 'snow'
        })
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "~quill/dist/quill.snow.css"
  @import "~highlight.js/styles/monokai-sublime.css"
    .editor
      width: 100%
      height:100%
      padding: 40px
      .quill-editor-wrapper
        width: 100%
        height:100%
</style>
