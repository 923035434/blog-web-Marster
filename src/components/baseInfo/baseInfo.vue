<template>
  <div class="baseInfo">
    <div class="infoWrapper">
      <title-bar text="基本信息设置"></title-bar>
      <div class="avatar-wrapper">
        <img class="avatar" :src="avatarUrl" alt="">
        <input @change="imgSelected" class="img-file" accept="image/*" type="file">
      </div>
      <div class="content-wrapper">
        <div class="name-wrapper">
          <md-input-container md-clearable>
            <label>名字</label>
            <md-input v-model="name"></md-input>
          </md-input-container>
        </div>
        <div class="signature-wrapper">
          <md-input-container md-clearable>
            <label>个性签名</label>
            <md-input v-model="signature"></md-input>
          </md-input-container>
        </div>
        <div class="address-wrapper">
          <md-input-container md-clearable>
            <label>地址</label>
            <md-input v-model="address"></md-input>
          </md-input-container>
          <div class="baseInfo_btn">
            <md-button @click.stop="modifyBaseInfo" class="md-raised md-primary">修改</md-button>
          </div>
        </div>
      </div>
      <title-bar text="密码设置"></title-bar>
      <div class="password-wrapper">
        <div class="old-password-1">
          <md-input-container md-clearable>
            <label>请输入旧密码</label>
            <md-input v-model="oldPassword"></md-input>
          </md-input-container>
        </div>
        <div class="old-password-2">
          <md-input-container md-clearable>
            <label>请输入新密码</label>
            <md-input v-model="newPassword1"></md-input>
          </md-input-container>
        </div>
        <div class="new-password">
          <md-input-container md-has-password>
            <label>再次输入密码</label>
            <md-input type="newPassword2"></md-input>
          </md-input-container>
          <div class="password_btn">
            <md-button @click.stop="modifyPassword" class="md-raised md-primary">修改密码</md-button>
          </div>
        </div>
      </div>
    </div>
    <img-tailor @closeTailor="closeTailor" @imgClip="imgClip" :show="showImgTailor" :imgSrc="imgSourceSrc" ></img-tailor>
  </div>
</template>

<script type="text/ecmascript-6">
  import imgTailor from '../../base/imgTailor/imgTailor.vue'
  import titleBar from '../../base/titleBar/titleBar.vue'
  import {editBaseInfo, getBaseInfo} from '../../api/api_BlogSetting'
  export default {
    data () {
      return {
        avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505634699&di=57b6ff191b8bd0663f679b66b20de0f0&imgtype=jpg&er=1&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172445_mEsMU.jpeg',
        name: '刘小先森。',
        signature: '一个从朝阳行业转世投胎的小小程序员。',
        address: '广州',
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
        imgFile: {},
        showImgTailor: false,
        imgSourceSrc: ''
      }
    },
    created () {
      getBaseInfo().then((res) => {
        let result = JSON.parse(res)
        if (result.code !== 0) {
          console.log('getBaseInfo错误')
          return
        }
        let data = result.data
        this.name = data.userName
        this.signature = data.signature
        this.address = data.address
        this.avatarUrl = data.avatar
      })
    },
    methods: {
      modifyBaseInfo () {
        let param = {}
        param.UserName = this.name
        param.Signature = this.signature
        param.Address = this.address
        if (this.imgSourceSrc !== '') {
          param.Avatar = this.avatarUrl
        }
        editBaseInfo(param).then((res) => {
          let result = JSON.parse(res)
          if (result.code !== 0) {
            this.showTip('修改失败')
            return
          }
          let data = result.data
          this.name = data.userName
          this.signature = data.signature
          this.address = data.address
          this.avatarUrl = data.avatar
          this.showTip('修改成功')
        })
      },
      modifyPassword () {
        if (this.oldPassword === '') {
          this.showTip('请输入旧密码')
        }
        if (this.newPassword1 === '' || this.newPassword2 === '') {
          this.showTip('请输入完整新密码')
        }
        if (this.newPassword1 !== this.newPassword2) {
          this.showTip('两次输入密码不一致')
        }
      },
      showTip (message) {
        this.$emit('message', message)
      },
      imgClip (imgData) {
        this.avatarUrl = imgData
        this.showImgTailor = false
      },
      imgSelected (para) {
        if (para.target.files.length === 0) {
          return
        }
        this.imgFile = para.target.files[0]
        let fileReader = new FileReader()
        fileReader.onload = (e) => {
          this.imgSourceSrc = e.target.result
          this.showTailor()
        }
        fileReader.readAsDataURL(this.imgFile)
      },
      showTailor () {
        if (this.imgSourceSrc === '') {
          return
        }
        this.showImgTailor = true
      },
      closeTailor () {
        this.showImgTailor = false
      }
    },
    components: {
      'img-tailor': imgTailor,
      'title-bar': titleBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .baseInfo
    width: 100%
    min-height:100%
    overflow :scroll
    .avatar-wrapper
      position :relative
      border-radius :50%
      width :150px
      height: 150px
      margin :0 auto
      .avatar
        width: 100%
        height: 100%
        border-radius :50%
      .img-file
        position :absolute
        border-radius :50%
        left :0px
        top:0px
        opacity :0
        display :block
        width :100%
        height:100%
        cursor:pointer
    .content-wrapper
      padding : 40px 20% 0 20%
      .name-wrapper,.signature-wrapper,.address-wrapper
        padding:0 20%
      .address-wrapper
        position :relative
        .baseInfo_btn
          position :absolute
          bottom :0px
          right :0px
    .password-wrapper
      padding : 40px 20% 0 20%
      .old-password-1,.old-password-2,.new-password
        padding:0 20%
      .new-password
        position :relative
        .password_btn
          position :absolute
          right :0px
          bottom :0
</style>
