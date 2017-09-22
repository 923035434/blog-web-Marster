<template>
  <div class="personality-setting">
    <title-bar text="移动端设置"></title-bar>
    <div class="group-select-wrapper">
      <div class="select">
        <md-input-container>
          <label for="m_img_select">选择主题</label>
          <md-select id="m_img_select" v-model="m_bgImg_index">
            <md-option :value="index"  v-for="(item,index) in m_bgImgList" >主题 - {{index}}</md-option>
          </md-select>
        </md-input-container>
        <div class="m-theme-btn-wrapper">
          <div class="btn-add">
            <md-button  @click="addMImg" class="md-raised  md-primary">新建主题</md-button>
          </div>
          <div class="btn-delete">
            <md-button @click="deleteMImg" class="md-raised  md-primary">删除主题</md-button>
          </div>
        </div>
      </div>
    </div>
    <div class="m-setting-wrapper">
      <div class="title">主页背景</div>
      <div @click="openDialog('dialog_m_editHomeImg')" class="img-wrapper home-img-wrapper">
        <md-image :md-src="m_homeImg"></md-image>



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
      <div @click="openDialog('dialog_m_editBlogImg')"  class="img-wrapper blog-img-wrapper">
        <md-image :md-src="m_blogImg"></md-image>


        <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog_m_editBlogImg">
          <md-dialog-title>请选择图片源</md-dialog-title>
          <md-dialog-content>
            <md-tabs>
              <md-tab  md-label="本地图片">
                <md-input-container>
                  <label>请选择图片</label>
                  <md-file @selected="m_blogImgSelected" accept="image/*"></md-file>
                </md-input-container>
              </md-tab>

              <md-tab  md-label="图片url">
                <md-input-container>
                  <label>请输入图片url</label>
                  <md-input v-model="m_blogImg_input"></md-input>
                </md-input-container>
              </md-tab>
            </md-tabs>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-primary" @click="edit_m_BlogImg">修改</md-button>
            <md-button class="md-primary" @click="closeDialog('dialog_m_editBlogImg')">取消</md-button>
          </md-dialog-actions>
        </md-dialog>


      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import titleBar from '../../base/titleBar/titleBar.vue'
  import {getMImg, editMImg, addMImg, deleteMImg} from '../../api/api_BlogSetting'
  export default {
    data () {
      return {
        m_bgImgList: [
          {
            id: 1,
            blogImg: '',
            homeImg: ''
          },
          {
            id: 2,
            blogImg: '',
            homeImg: ''
          }
        ],
        m_homeImg_input: '',
        m_blogImg_input: '',
        m_bgImg_index: 0
      }
    },
    computed: {
      m_homeImg () {
        return this.m_bgImgList[this.m_bgImg_index] ? this.m_bgImgList[this.m_bgImg_index].homeImg : ''
      },
      m_blogImg () {
        return this.m_bgImgList[this.m_bgImg_index] ? this.m_bgImgList[this.m_bgImg_index].blogImg : ''
      }
    },
    created () {
      getMImg().then((res) => {
        let result = JSON.parse(res)
        if (result.code !== 0) {
          this.showTip('getMImg错误')
          return
        }
        this.m_bgImgList = result.data
        for (var i = 0; i < this.m_bgImgList.length; i++) {
          if (this.m_bgImgList[i].isDelete === 1) {
            this.m_bgImg_index = i
          }
        }
      })
    },
    methods: {
      showTip (message) {
        this.$emit('message', message)
      },
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref) {
        this.m_homeImg_input = ''
        this.m_blogImg_input = ''
        this.$refs[ref].close()
      },
      m_homeImgSelected (para) {
        let imgFile = para[0]
        let fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.m_homeImg_input = e.target.result
        }
        fileReader.readAsDataURL(imgFile)
      },
      edit_m_homeImg () {
        this.m_bgImgList[this.m_bgImg_index].homeImg = this.m_homeImg_input
        let param = {
          Id: this.m_bgImgList[this.m_bgImg_index].id,
          M_HomeImg: this.m_bgImgList[this.m_bgImg_index].homeImg
        }
        editMImg(param).then((res) => {
          let result = JSON.parse(res)
          if (result.code === 0) {
            this.showTip('修改成功')
            return
          } else {
            this.showTip('修改失败')
          }
        })
        this.closeDialog('dialog_m_editHomeImg')
      },
      m_blogImgSelected (para) {
        let imgFile = para[0]
        let fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.m_blogImg_input = e.target.result
        }
        fileReader.readAsDataURL(imgFile)
      },
      edit_m_BlogImg () {
        this.m_bgImgList[this.m_bgImg_index].blogImg = this.m_blogImg_input
        let param = {
          Id: this.m_bgImgList[this.m_bgImg_index].id,
          M_BlogImg: this.m_bgImgList[this.m_bgImg_index].blogImg
        }
        editMImg(param).then((res) => {
          let result = JSON.parse(res)
          if (result.code === 0) {
            this.showTip('修改成功')
          } else {
            this.showTip('修改失败')
          }
        })
        this.closeDialog('dialog_m_editBlogImg')
      },
      addMImg () {
        console.log('addMImg')
        addMImg().then((res) => {
          let result = JSON.parse(res)
          if (result.code !== 0) {
            this.showTip(result.message)
            return
          }
          this.m_bgImgList.push(result.data)
          this.m_bgImg_index = this.m_bgImgList.length - 1
          this.showTip('新建成功')
        })
      },
      deleteMImg () {
        console.log('deleteMImg')
        let item = this.m_bgImgList[this.m_bgImg_index]
        let param = {
          id: item.id
        }
        deleteMImg(param).then((res) => {
          let result = JSON.parse(res)
          if (result.code !== 0) {
            this.showTip('删除失败')
          } else {
            this.m_bgImgList.splice(this.m_bgImg_index, 1)
            this.m_bgImg_index--
            this.showTip('删除成功')
          }
        })
      }
    },
    watch: {
      m_bgImg_index (newIndex) {
        let item = this.m_bgImgList[newIndex]
        let param = {
          Id: item.id,
          IsDelete: 1
        }
        for (var index in this.m_bgImgList) {
          this.m_bgImgList[index].isDelete = 0
        }
        item.isDelete = 1
        editMImg(param).then((res) => {
          let result = JSON.parse(res)
          if (result.code !== 0) {
            this.showTip(result.message)
            return
          }
          this.showTip('主题已更换')
        })
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
