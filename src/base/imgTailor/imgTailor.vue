<template>
  <div
    @mousemove="MouseMove"
    @mouseup="MouseUp"
    @click.self="close"
    v-show="show" class="imgTailor">
    <div ref="imgWrapperDom" class="img-wrapper">
      <img @load="imgLoad" class="bottom-img" v-show="imgSrc" :src="imgSrc" >
      <div class="top-img-wrapper">
        <img ref="topImgDom" class="top-img" v-show="imgSrc" :src="imgSrc">
      </div>
      <div class="filter">
        <div
               @mousedown.self="recMouseDown"
          ref="recDom" class="tailor_rec">
          <div class="topLeft"
               @mousedown.stop="topLeftMouseDown"
          ></div>
          <div class="topRight"
               @mousedown.stop="topRightMouseDown"
          ></div>
          <div class="bottomLeft"
               @mousedown.stop="bottomLeftMouseDown"
          ></div>
          <div class="bottomRight"
               @mousedown.stop="bottomRightMouseDown"
          ></div>
          <div class="rec_width">width:{{recShowWidth}}</div>
          <div class="rec_height">height:{{recShowHeight}}</div>
        </div>
      </div>
    </div>
    <md-button @click="canvasClip" class="ok_btn md-raised md-primary">Clip(ok)</md-button>
  </div>
</template>

<script type="text/ecmascript-6">
  const moveType = {
    topLeft: 0,
    topRight: 1,
    bottomLeft: 2,
    bottomRight: 3
  }
  export default {
    props: {
      imgSrc: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        mouseStar: false,
        trangeSizeStar: false,
        recShowWidth: 200,
        recShowHeight: 200
      }
    },
//    watch: {
//      imgSrc () {
//        let recDom = this.$refs.recDom
//        let imgWrapperDom = this.$refs.imgWrapperDom
//        console.log(imgWrapperDom.clientWidth)
//        recDom.style.height = recDom.style.width = imgWrapperDom.clientWidth / 2 + 'px'
//        this.clip()
//      }
//    },
    computed: {
    },
    methods: {
      _setChangeStar (e) {
        this.changeStar = {
          x: e.clientX,
          y: e.clientY
        }

        let recDom = this.$refs.recDom
        let imgWrapperDom = this.$refs.imgWrapperDom
        let recRect = recDom.getBoundingClientRect()
        let wrapperRect = imgWrapperDom.getBoundingClientRect()

        this.recLeft = recRect.left - wrapperRect.left
        this.recTop = recRect.top - wrapperRect.top

        this.recWidth = recDom.clientWidth
        this.recHeight = recDom.clientHeight
      },
      _setRecSize () {
        this.$nextTick(() => {
          let recDom = this.$refs.recDom
          this.recShowWidth = recDom.clientWidth
          this.recShowHeight = recDom.clientHeight
        })
      },
      canvasClip () {
        let recDom = this.$refs.recDom
        let imgWrapperDom = this.$refs.imgWrapperDom
        let recRect = recDom.getBoundingClientRect()
        let wraRect = imgWrapperDom.getBoundingClientRect()
        let y = recRect.top - wraRect.top
        let x = recRect.left - wraRect.left
        let canvas = document.createElement('canvas')
        canvas.width = this.recShowWidth
        canvas.height = this.recShowHeight
        let ctx = canvas.getContext('2d')
        let img = new Image()
        img.onload = () => {
          ctx.drawImage(img, x, y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
          this.$emit('imgClip', canvas.toDataURL())
        }
        img.src = this.imgSrc
      },
      topLeftMouseDown (e) {
        this.trangeSizeStar = true
        this.changeType = moveType.topLeft
        this._setChangeStar(e)
      },
      topRightMouseDown (e) {
        this.trangeSizeStar = true
        this.changeType = moveType.topRight
        this._setChangeStar(e)
      },
      bottomLeftMouseDown (e) {
        this.trangeSizeStar = true
        this.changeType = moveType.bottomLeft
        this._setChangeStar(e)
      },
      bottomRightMouseDown (e) {
        this.trangeSizeStar = true
        this.changeType = moveType.bottomRight
        this._setChangeStar(e)
      },
      changeSizeMouseMove (e) {
        if (!this.trangeSizeStar) {
          return
        }
        let recDom = this.$refs.recDom
        let imgWrapperDom = this.$refs.imgWrapperDom
        let width = recDom.clientWidth
        let height = recDom.clientHeight
        let left = this.recLeft
        let top = this.recTop
        switch (this.changeType) {
          case moveType.topLeft: //  左上
            width = Math.min(Math.max(this.recWidth + (this.changeStar.x - e.clientX), 0), imgWrapperDom.clientWidth)
            height = Math.min(Math.max(this.recHeight + (this.changeStar.y - e.clientY), 0), imgWrapperDom.clientHeight)
            left = Math.min(Math.max(left + (e.clientX - this.changeStar.x), 0), imgWrapperDom.clientWidth - recDom.clientWidth)
            top = Math.min(Math.max(top + (e.clientY - this.changeStar.y), 0), imgWrapperDom.clientHeight - recDom.clientHeight)
            break
          case moveType.topRight: //  右上
            width = Math.min(Math.max(this.recWidth + (e.clientX - this.changeStar.x), 0), imgWrapperDom.clientWidth)
            height = Math.min(Math.max(this.recHeight + (this.changeStar.y - e.clientY), 0), imgWrapperDom.clientHeight)
            top = Math.min(Math.max(top + (e.clientY - this.changeStar.y), 0), imgWrapperDom.clientHeight - recDom.clientHeight)
            break
          case moveType.bottomLeft: //  左下
            width = Math.min(Math.max(this.recWidth + (this.changeStar.x - e.clientX), 0), imgWrapperDom.clientWidth)
            height = Math.min(Math.max(this.recHeight + (e.clientY - this.changeStar.y), 0), imgWrapperDom.clientHeight)
            left = Math.min(Math.max(left + (e.clientX - this.changeStar.x), 0), imgWrapperDom.clientWidth - recDom.clientWidth)
            break
          case moveType.bottomRight: //  右下
            width = Math.min(Math.max(this.recWidth + (e.clientX - this.changeStar.x), 0), imgWrapperDom.clientWidth)
            height = Math.min(Math.max(this.recHeight + (e.clientY - this.changeStar.y), 0), imgWrapperDom.clientHeight)
            break
        }
        recDom.style.top = top + 'px'
        recDom.style.left = left + 'px'
        recDom.style.width = width + 'px'
        recDom.style.height = height + 'px'
        this._setRecSize()
      },
      recMouseDown (e) {
        this.mouseStar = true
        this.recStarX = e.clientX
        this.recStarY = e.clientY

        let recDom = this.$refs.recDom
        let imgWrapperDom = this.$refs.imgWrapperDom
        let recRect = recDom.getBoundingClientRect()
        let wrapperRect = imgWrapperDom.getBoundingClientRect()

        this.recLeft = recRect.left - wrapperRect.left
        this.recTop = recRect.top - wrapperRect.top
      },
      recMouseMove (e) {
        if (!this.mouseStar) {
          return
        }
        this.$nextTick(() => {
          let recDom = this.$refs.recDom
          let imgWrapperDom = this.$refs.imgWrapperDom
          let left = Math.min(imgWrapperDom.clientWidth - recDom.clientWidth, Math.max(this.recTop + e.clientX - this.recStarX, 0))
          let top = Math.min(imgWrapperDom.clientHeight - recDom.clientHeight, Math.max(this.recLeft + e.clientY - this.recStarY, 0))
          recDom.style.top = top + 'px'
          recDom.style.left = left + 'px'
        })
      },
      MouseMove (e) {
        if (!this.mouseStar && !this.trangeSizeStar) {
          return
        }
        if (this.mouseStar) {
          this.recMouseMove(e)
        } else if (this.trangeSizeStar) {
          this.changeSizeMouseMove(e)
        }
      },
      MouseUp (e) {
        this.mouseStar = false
        this.trangeSizeStar = false
        this.clip()
      },
      clip () {
        let topImgDom = this.$refs.topImgDom
        let recDom = this.$refs.recDom
        let imgWrapperDom = this.$refs.imgWrapperDom
        let recRect = recDom.getBoundingClientRect()
        let wrapperRect = imgWrapperDom.getBoundingClientRect()
        let top = recRect.top - wrapperRect.top
        let right = recRect.right - wrapperRect.left
        let bottom = recRect.bottom - wrapperRect.top
        let left = recRect.left - wrapperRect.left
        topImgDom.style.clip = 'rect(' + top + 'px,' + right + 'px,' + bottom + 'px,' + left + 'px)'
      },
      imgLoad () {
        console.log('imgLoad')
        let recDom = this.$refs.recDom
        let imgWrapperDom = this.$refs.imgWrapperDom
        console.log(imgWrapperDom.clientWidth)
        recDom.style.height = recDom.style.width = imgWrapperDom.clientWidth / 2 + 'px'
        this.recShowWidth = recDom.clientWidth
        this.recShowHeight = recDom.clientHeight
        this.clip()
      },
      close () {
        this.$emit('closeTailor')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .imgTailor
    position :fixed
    z-index: 999
    top :0px
    left :0px
    right :0px
    bottom :0px
    background-color: rgba(52,80,103,0.5)
    .img-wrapper
      position :absolute
      left :30%
      top: 20px
      img
        user-select: none
      .bottom-img
        filter :grayscale(100%)
      .top-img-wrapper
        position :absolute
        top : 0px
        left: 0px
        width: 100%
        height: 100%
        .top-img
          position :absolute
          left :0px
          top: 0px
          clip: rect(36px 370px 286px 101px)
          user-select: none
      .filter
        position : absolute
        top : 0px
        left: 0px
        width: 100%
        height: 100%
        .tailor_rec
          position : absolute
          top :0px
          left :0px
          width :200px
          height: 200px
          border :1px solid #000
          cursor :move
          .topLeft
            position : absolute
            top :-6px
            left: -6px
            border: 1px solid #fff
            width: 6px
            height: 6px
            cursor: nw-resize
          .topRight
            position : absolute
            top :-6px
            right: -6px
            border: 1px solid #fff
            width: 6px
            height: 6px
            cursor: sw-resize
          .bottomLeft
            position : absolute
            bottom :-6px
            left: -6px
            border: 1px solid #fff
            width: 6px
            height: 6px
            cursor: ne-resize
          .bottomRight
            position : absolute
            bottom :-6px
            right :-6px
            border: 1px solid #fff
            width: 6px
            height: 6px
            cursor: se-resize
          .rec_width
            position :absolute
            bottom :30px
            right :-110px
            width: 100px
            height: 24px
            color :#07f589
            cursor :pointer
          .rec_height
            position :absolute
            bottom :0px
            right :-110px
            width: 100px
            height: 24px
            color :#07f589
            cursor :pointer
    .ok_btn
      position :absolute
      right: 10%
      top :10%
</style>
