<template>
  <div class="newBlog">
    <div class="input-wrapper">
      <div class="image-wrapper">
        <md-input-container>
          <label>选择图片</label>
          <md-file @selected="imgSelected" accept="image/*"></md-file>
        </md-input-container>
        <div @click="showTailor" class="imgLoader">
          <md-image :md-src="imgSrc"></md-image>
        </div>
      </div>
      <div class="desc-wrapper">
        <md-input-container>
          <label>标题：</label>
          <md-input v-model="title" maxlength="20" ></md-input>
        </md-input-container>
        <md-input-container>
          <label>简述：</label>
          <md-textarea v-model="desc" maxlength="60"></md-textarea>
        </md-input-container>
        <editor ref="editor" @editor-change="editorChange"></editor>
        <md-button @click="send" class="send-btn md-raised md-primary">提交</md-button>
        <div class="type-select-wrapper">
          <md-input-container>
            <label for="type-select">选择类型</label>
            <md-select id="type-select" v-model="selectTypeId">
              <md-option :value="item.id"  v-for="(item,index) in blogTypes" >{{item.name}}</md-option>
            </md-select>
          </md-input-container>
        </div>
      </div>
    </div>
    <img-tailor @closeTailor="closeTailor" @imgClip="imgClip" :show="showImgTailor" :imgSrc="imgSourceSrc" ></img-tailor>
  </div>
</template>

<script type="text/ecmascript-6">
  import editor from '../../base/editor/editor.vue'
  import imgTailor from '../../base/imgTailor/imgTailor.vue'
  import {addBlog} from '../../api/api_blog'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        imgSourceSrc: '',
        imgSrc: '',
        imgFile: {},
        title: '',
        desc: '',
        htmlContent: '',
        showImgTailor: false,
        selectTypeId: -1
      }
    },
    created () {
    },
    computed: {
      ...mapGetters([
        'blogTypes'
      ])
    },
    methods: {
      imgSelected (para) {
        this.imgFile = para[0]
        let fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.imgSourceSrc = e.target.result
          this.showTailor()
        }
        fileReader.readAsDataURL(this.imgFile)
      },
      send () {
        if (this.title === '') {
          this.showTip('请输入标题')
          return
        }
        if (this.desc === '') {
          this.showTip('请输入简述')
          return
        }
        if (!this.imgFile.name) {
          this.showTip('请选择图片')
          return
        }
        if (this.htmlContent === '') {
          this.showTip('请输入内容')
          return
        }
        if (this.selectTypeIndex === -1) {
          this.showTip('请选择类型')
          return
        }
        let time = (new Date()).getTime()
        let param = {
          TypeId: this.selectTypeId,
          Title: this.title,
          Desc: this.desc,
          ImgUrl: this.imgSrc,
          HtmlContent: this.htmlContent,
          Time: time
        }
        addBlog(param).then((res) => {
          let result = JSON.parse(res)
          this.showTip(res.message)
          if (result.code !== 0) {
            this.showTip('发表失败')
            return
          }
          this.showTip('发表成功')
          this.clearPage()
        })
      },
      clearPage () {
        this.imgSourceSrc = ''
        this.imgSrc = ''
        this.title = ''
        this.desc = ''
        this.htmlContent = ''
        this.selectTypeId = -1
        let editor = this.$refs.editor
        editor.clearContent()
      },
      showTip (message) {
        this.$emit('message', message)
      },
      editorChange (htmlContent) {
        this.htmlContent = htmlContent
      },
      imgClip (imgData) {
        this.closeTailor()
        this.imgSrc = imgData
      },
      closeTailor () {
        this.showImgTailor = false
      },
      showTailor () {
        if (this.imgSourceSrc === '') {
          return
        }
        this.showImgTailor = true
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
  .newBlog
    width: 100%
    .input-wrapper
      width:100%
      height:100%
      padding:20px 50px
      display :flex
      .image-wrapper
        flex :0 0 200px
        width: 200px
        height:300px
        .imgLoader
          width: 200px
          height:200px
          img
            width: 100%
            height:100%
      .desc-wrapper
        position :relative
        flex :1
        padding: 0 50px
        .send-btn
          position :absolute
          width: 150px
          height:50px
          right :5%
          bottom :20%
        .type-select-wrapper
          position :absolute
          right:5%
          bottom : 50%
          width :150px
</style>
