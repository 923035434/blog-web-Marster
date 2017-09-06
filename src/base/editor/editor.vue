<template>
  <div class="editor">
    <div ref="quillDom" class="quill-editor-wrapper">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    var hljs = require('highlight.js')  // 应该用require而不是import
    window.hljs = window.hljs ? window.hljs : hljs
    var Quill = require('quill')
    export default {
      data () {
        return {
          editor: {}
        }
      },
      components: {
      },
      methods: {
        _initQuill () {
          this.quillDom = this.$refs.quillDom
          let toolbarOptions = [
            [{ 'font': ['Inconsolata', 'Roboto', 'Mirza', 'Arial', 'Helvetica'] }],
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
            ['link', 'image', 'video', 'formula'],                                // inner
            ['clean']                                         // remove formatting button
          ] // 功能栏的设置
          let Font = Quill.import('formats/font')
          Font.whitelist = ['Inconsolata', 'Roboto', 'Mirza', 'Arial', 'Helvetica']
          Quill.register(Font, true)
          this.editor = new Quill(this.quillDom, { // 初始化
            modules: { syntax: true, toolbar: toolbarOptions },
            theme: 'snow'
          })
          let that = this
          this.editor.on('editor-change', () => {
            let htmlContent = that.quillDom.querySelector(' .ql-editor').innerHTML
            that.$emit('editor-change', htmlContent)
          })
        }
      },
      mounted () {
        this._initQuill()
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    .editor
      width: 80%
      height:500px
      padding: 40px
      .quill-editor-wrapper
        width: 100%
        height:100%
      .ql-toolbar
        .ql-font
          span[data-value="Sans Serif"]::before
            content: 'Sans Serif'
            font-family: "Sans Serif"
          span[data-value="Inconsolata"]::before
            content: 'Inconsolata'
            font-family: "Inconsolata"
          span[data-value="Roboto"]::before
            content: 'Roboto'
            font-family: "Roboto"
          span[data-value="Mirza"]::before
            content: 'Mirza'
            font-family: "Mirza"
          span[data-value="Arial"]::before
            content: 'Arial'
            font-family: "Arial"
          span[data-value="Helvetica"]::before
            content: 'Helvetica'
            font-family: "Helvetica"
</style>
