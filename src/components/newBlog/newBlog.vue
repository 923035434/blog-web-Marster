<template>
  <div class="newBlog">
    <div class="input-wrapper">
      <div class="image-wrapper">
        <md-input-container>
          <label>选择图片</label>
          <md-file @selected="imgSelected" accept="image/*"></md-file>
        </md-input-container>
        <div class="imgLoader">
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
        <editor></editor>
        <md-button @click="send" class="send-btn md-raised md-primary">提交</md-button>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import editor from '../../base/editor/editor.vue'
  import {addBlog} from '../../api/api_blog'
  export default {
    data () {
      return {
        imgSrc: null,
        imgFile: {},
        title: '',
        desc: ''
      }
    },
    methods: {
      imgSelected (para) {
        this.imgFile = para[0]
        let fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.imgSrc = e.target.result
        }
        fileReader.readAsDataURL(this.imgFile)
      },
      send () {
        let formData = new FormData()
        if (this.title === '') {
          this.showTip('请输入标题')
          return
        } else {
          formData.append('title', this.title)
        }
        if (this.desc === '') {
          this.showTip('请输入简述')
          return
        } else {
          formData.append('desc', this.desc)
        }
        if (!this.imgFile.name) {
          this.showTip('请选择图片')
          return
        } else {
          formData.append('img', this.imgFile)
        }
        addBlog(formData).then((res) => {
          this.showTip(res.message)
        })
      },
      showTip (text) {
        console.log(text)
      }
    },
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
</style>
