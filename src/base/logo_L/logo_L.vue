<template>
  <div class="logo_L">
    <div :style="style" class="logo">
      <div :style="topCStyle" class="top-half-circle"></div>
      <div :style="rightCStyle" class="right-half-circle"></div>
      <div :style="vLineStyle" class="vertical-line"></div>
      <div :style="hLineStyle" class="horizontal-line"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    height: {
      type: Number,
      default: 150
    },
    color: {
      type: String,
      default: '#2196f3'
    }
  },
  computed: {
    style () {
      return {
        'width': (this.height / 288 * 266) + 'px',
        'height': this.height + 'px',
        'border-left': (this.height / 288 * 16) + 'px solid ' + this.color,
        'border-bottom': (this.height / 288 * 16) + 'px solid ' + this.color,
        'border-bottom-left-radius': (this.height / 288 * 34) + 'px'
      }
    },
    topCStyle () {
      return {
        'width': (this.height / 288 * 47) + 'px',
        'height': this.height * 0.5 + 'px',
        'border-top': (this.height / 288 * 16) + 'px solid ' + this.color,
        'border-left': (this.height / 288 * 16) + 'px solid ' + this.color,
        'border-right': (this.height / 288 * 16) + 'px solid ' + this.color,
        'border-top-left-radius': (this.height / 288 * 39) + 'px',
        'border-top-right-radius': (this.height / 288 * 39) + 'px',
        'top': -(this.height / 288 * 29) + 'px',
        'left': -(this.height / 288 * 16) + 'px'
      }
    },
    rightCStyle () {
      return {
        'height': (this.height / 288 * 47) + 'px',
        'width': this.height * 0.5 + 'px',
        'border-top': (this.height / 288 * 16) + 'px solid ' + this.color,
        'border-right': (this.height / 288 * 16) + 'px solid ' + this.color,
        'border-bottom': (this.height / 288 * 16) + 'px solid ' + this.color,
        'border-top-right-radius': (this.height / 288 * 39) + 'px',
        'border-bottom-right-radius': (this.height / 288 * 39) + 'px',
        'right': -(this.height / 288 * 29) + 'px',
        'bottom': -(this.height / 288 * 47) + 'px'
      }
    },
    vLineStyle () {
      return {
        'background-color': this.color,
        'width': (this.height / 288 * 16) + 'px',
        'height': this.height * 0.9 + 'px',
        'top': 0 + 'px',
        'left': (this.height / 288 * 14) + 'px'
      }
    },
    hLineStyle () {
      return {
        'background-color': this.color,
        'height': (this.height / 288 * 16) + 'px',
        'width': this.height * 0.94 + 'px',
        'right': 0 + 'px',
        'bottom': -(this.height / 288 * 47) + 'px'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .logo_L
    .logo
      position :relative
      top :0px
      left: 0px
      .top-half-circle,.right-half-circle,.vertical-line,.horizontal-line
        position :absolute
</style>
