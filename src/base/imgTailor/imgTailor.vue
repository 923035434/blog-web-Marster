<template>
  <div
    @mousemove="recMouseMove"
    @mouseup="recMouseUp"
    v-show="show" class="imgTailor">
    <div ref="imgWrapperDom" class="img-wrapper">
      <img class="bottom-img" v-show="imgSrc" :src="imgSrc" >
      <div class="top-img-wrapper">
        <img class="top-img" v-show="imgSrc" :src="imgSrc">
      </div>
      <div class="filter">
        <div
          @mousedown="recMouseDown"
          ref="recDom" class="tailor_rec">
        </div>
      </div>
    </div>
    <md-button class="ok_btn md-raised md-primary">ok</md-button>
  </div>
</template>

<script type="text/ecmascript-6">
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
        mouseStar: false
      }
    },
    computed: {
    },
    methods: {
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
          console.log(this.recTop + e.clientX - this.recStarX)
          console.log(this.recLeft + e.clientY - this.recStarY)
          let left = Math.min(imgWrapperDom.clientWidth - recDom.clientWidth, Math.max(this.recTop + e.clientX - this.recStarX, 0))
          let top = Math.min(imgWrapperDom.clientHeight - recDom.clientHeight, Math.max(this.recLeft + e.clientY - this.recStarY, 0))
          recDom.style.top = top + 'px'
          recDom.style.left = left + 'px'
        })
      },
      recMouseUp (e) {
        this.mouseStar = false
        console.log(e)
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
    .ok_btn
      position :absolute
      right: 10%
      top :10%
</style>
