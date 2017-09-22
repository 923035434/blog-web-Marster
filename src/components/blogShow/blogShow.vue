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
            <editor ref="editor" :editorHeight="editorHeight" @editor-change="editorChange"></editor>
          </div>
        </div>
      </div>
      <img-tailor @closeTailor="closeTailor" @imgClip="imgClip" :show="showImgTailor" :imgSrc="imgSourceSrc" ></img-tailor>
      <div class="type-select-wrapper">
        <md-input-container>
          <label for="type-select">选择类型</label>
          <md-select id="type-select" v-model="selectTypeId">
            <md-option :value="item.id"  v-for="(item,index) in blogTypes" >{{item.name}}</md-option>
          </md-select>
        </md-input-container>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import editor from '../../base/editor/editor.vue'
  import imgTailor from '../../base/imgTailor/imgTailor.vue'
  import {mapGetters, mapMutations} from 'vuex'
  import {editBlog} from '../../api/api_blog'
  export default {
    data () {
      return {
        editorH: 500,
        title: '',
        desc: '',
        imgSrc: '',
        selectTypeId: -1,
        imgFile: '',
        htmlContent: '',
        showImgTailor: false,
        imgSourceSrc: ''
      }
    },
    computed: {
      editorHeight () {
        return this.editorH + 'px'
      },
      ...mapGetters([
        'blogShowItem',
        'blogTypes'
      ])
    },
    methods: {
      close () {
        this.editBlog()
        this.setBlogShowState(false)
      },
      editBlog () {
        let id = this.blogShowItem.id
        let data = {
          TypeId: this.selectTypeId,
          Title: this.title,
          Desc: this.desc,
          ImgUrl: this.imgSrc,
          HtmlContent: this.htmlContent
        }
        editBlog(id, data).then((res) => {
          let result = JSON.parse(res)
          if (result.code !== 0) {
            this.showTip('修改失敗')
            return
          }
          this.showTip('修改成功')
          let oldTypeId = this.blogShowItem.typeId
          let newTypeId = this.selectTypeId
          this.blogShowItem.typeId = newTypeId
          this.blogShowItem.title = this.title
          this.blogShowItem.desc = this.desc
          this.blogShowItem.img = this.imgSrc
          this.blogShowItem.content = this.htmlContent
          if (oldTypeId !== newTypeId) {
            let oldType = this.blogTypes.filter(item => {
              return item.id === oldTypeId
            })[0]
            let newType = this.blogTypes.filter(item => {
              return item.id === newTypeId
            })[0]
            let index = oldType.blogs.indexOf(this.blogShowItem)
            let blogItem = oldType.blogs[index]
            oldType.blogs.splice(index, 1)
            newType.blogs.push(blogItem)
          }
        })
      },
      editorChange (htmlContent) {
        this.htmlContent = htmlContent
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
      showTip (message) {
        this.$emit('message', message)
      },
      showTailor () {
        this.showImgTailor = true
      },
      closeTailor () {
        this.showImgTailor = false
      },
      ...mapMutations({
        'setBlogShowState': 'SET_BLOG_SHOW_STATE'
      })
    },
    created () {
      this.editorH = document.body.clientHeight * 0.9
    },
    watch: {
      blogShowItem (newItem) {
        this.title = newItem.title
        this.desc = newItem.desc
        this.imgSrc = newItem.img
        this.htmlContent = newItem.content
        this.selectTypeId = newItem.typeId
        this.$refs.editor.fullSetHtmlContent(newItem.content)
      }
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
      z-index :50
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
    .type-select-wrapper
      position :absolute
      z-index :50
      right: 100px
      top : 200px
</style>
