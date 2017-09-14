<template>
  <div class="personality-setting">
    <title-bar text="移动端设置"></title-bar>
    <div class="group-select-wrapper">
      <div class="select">
        <md-input-container>
          <label for="m_img_select">选择主题</label>
          <md-select name="country" id="m_img_select" v-model="country">
            <md-option value="australia">Australia</md-option>
            <md-option value="brazil">Brazil</md-option>
            <md-option value="japan">Japan</md-option>
            <md-option value="united_states">United States</md-option>
          </md-select>
        </md-input-container>
      </div>
    </div>
    <div class="m-setting-wrapper">
      <div class="title">主页背景</div>
      <div @click="openDialog('dialog_m_editHomeImg')" class="img-wrapper home-img-wrapper">
        <md-image :md-src="m_bgImgList[m_slectedId].homeImg"></md-image>



        <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog_m_editHomeImg">
          <md-dialog-title>请选择图片源</md-dialog-title>
          <md-dialog-content>
            <md-tabs>
              <md-tab  md-label="本地图片">
                <md-input-container>
                  <label>请选择图片</label>
                  <md-file @selected="m_homeImgSelected" accept="image/*"></md-file>
                </md-input-container>
              </md-tab>

              <md-tab  md-label="图片url">
                <md-input-container>
                  <label>请输入图片url</label>
                  <md-input v-model="m_homeImg_input"></md-input>
                </md-input-container>
              </md-tab>
            </md-tabs>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-primary" @click="edit_m_homeImg">修改</md-button>
            <md-button class="md-primary" @click="closeDialog('dialog_m_editHomeImg')">取消</md-button>
          </md-dialog-actions>
        </md-dialog>



      </div>
      <div class="title">blog页背景</div>
      <div class="img-wrapper blog-img-wrapper">
        <md-image :md-src="m_bgImgList[m_slectedId].blogImg"></md-image>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import titleBar from '../../base/titleBar/titleBar.vue'
  import {getMImg, editMImg} from '../../api/api_BlogSetting'
  export default {
    data () {
      return {
        m_bgImgList: [],
        m_homeImg_input: '',
        m_slectedId: 0
      }
    },
    created () {
      getMImg().then((res) => {
        if (res !== 0) {
          console.log('getMImg错误')
          return
        }
        this.m_bgImgList = res.data
      })
    },
    methods: {
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref) {
        this.m_homeImg_input = ''
        this.$refs[ref].close()
      },
      m_homeImgSelected (para) {
        this.imgFile = para[0]
        let fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.m_homeImg_input = e.target.result
        }
        fileReader.readAsDataURL(this.imgFile)
      },
      edit_m_homeImg () {
        this.m_homeImg = this.m_homeImg_input
        let param = {
          Id: this.m_slectedId,
          M_HomeImg: this.m_homeImg
        }
        editMImg(param)
        this.closeDialog('dialog_m_editHomeImg')
      }
    },
    components: {
      'title-bar': titleBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .personality-setting
    width: 100%
    .group-select-wrapper
      position :relative
      width: 100%
      height:50px
      .select
        position :absolute
        top: 0
        right :100px
        width :100px
    .m-setting-wrapper
      padding-left:24px
      .title
        font-size:24px
        font-weight:500
        margin-bottom:24px
      .img-wrapper
        margin-left:20px
        margin-bottom:80px
        cursor:pointer
      .home-img-wrapper
        width:300px
        min-height :300px
        border :1px solid #cccccc
        img
          width:100%
      .blog-img-wrapper
          width:500px
          min-height :200px
          border:1px solid #cccccc
        img
          width:100%
</style>
