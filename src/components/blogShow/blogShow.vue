<template>
  <transition name="fade">
    <div class="blogShow">
      <div class="close_wrapper">
        <md-button @click="close" class="close_btn md-fab md-clean">
          <md-icon class="md-size-3x">close</md-icon>
        </md-button>
      </div>
      <div class="content-wrapper">
        <div class="content-left-wrapper">
          <div class="img-wrapper">
            <md-input-container>
              <label>选择图片</label>
              <md-file @selected="imgSelected" accept="image/*"></md-file>
            </md-input-container>
            <div class="imgLoader">
              <md-image :md-src="imgSrc"></md-image>
            </div>
          </div>
          <div class="text-wrapper">
            <md-input-container>
              <label>标题：</label>
              <md-input v-model="title" maxlength="20" ></md-input>
            </md-input-container>
            <md-input-container>
              <label>简述：</label>
              <md-textarea v-model="desc" maxlength="60"></md-textarea>
            </md-input-container>
          </div>
        </div>
        <div class="content-right-wrapper">
          <div class="editor-wrapper">
            <editor :editorHeight="editorHeight" @editor-change="editorChange"></editor>
          </div>
        </div>
      </div>
      <img-tailor @closeTailor="closeTailor" @imgClip="imgClip" :show="showImgTailor" :imgSrc="imgSourceSrc" ></img-tailor>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import editor from '../../base/editor/editor.vue'
  import imgTailor from '../../base/imgTailor/imgTailor.vue'
  export default {
    data () {
      return {
        editorH: 500,
        title: '',
        desc: '',
        imgSrc: '',
        imgFile: '',
        showImgTailor: false,
        imgSourceSrc: ''
      }
    },
    computed: {
      editorHeight () {
        return this.editorH + 'px'
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      editorChange (htmlContent) {
      },
      imgSelected (para) {
        if (para.length === 0) {
          return
        }
        this.imgFile = para[0]
        let fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.imgSourceSrc = e.target.result
          this.showTailor()
        }
        fileReader.readAsDataURL(this.imgFile)
      },
      imgClip (dataUrl) {
        this.imgSrc = dataUrl
        this.closeTailor()
      },
      showTailor () {
        this.showImgTailor = true
      },
      closeTailor () {
        this.showImgTailor = false
      }
    },
    created () {
      this.editorH = document.body.clientHeight * 0.9
    },
    components: {
      editor,
      'img-tailor': imgTailor
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .blogShow
    position :fixed
    top: 0px
    left :0px
    right :0px
    bottom :0px
    z-index :50
    background-color: #fff
    &.fade-enter-active,&.fade-leave-active
      transition:all 0.5s
    &.fade-enter,&.fade-leave-to
      opacity :0
    .close_wrapper
      position :absolute
      right: 100px
      top : 50px
      color :#000
      cursor:pointer
      .close_btn
        width: 80px
        height:80px
    .content-wrapper
      width :100%
      height: 100%
      padding:20px 10px
      display :flex
      .content-left-wrapper
        flex :0 0 400px
        padding-top:50px
        padding-left:30px
        height:100%
        .imgLoader
          width: 200px
          height:200px
          img
            width: 100%
            height:100%
      .content-right-wrapper
        padding-left:40px
        flex: 1
        height:100%
</style>
