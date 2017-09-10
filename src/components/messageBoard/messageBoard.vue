<template>
  <div class="messageBoard">
    <md-layout md-gutter>
      <md-layout>
        <div :style="{width:ItemWidth+'px'}" class="messageItem">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">刘小先森</div>
              <div class="md-subhead">
                <md-icon>email</md-icon>
                <span class="text">923035434@qq.com</span>
              </div>
              <div class="md-subhead">
                <md-icon>phonelink_ring</md-icon>
                <span class="text">123456789</span>
              </div>
            </md-card-header>

            <md-card-content>
              你好呀！
            </md-card-content>
          </md-card>
        </div>
        <div :style="{width:ItemWidth+'px'}" class="messageItem">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">刘小先森</div>
              <div class="md-subhead">
                <md-icon>email</md-icon>
                <span class="text">923035434@qq.com</span>
              </div>
              <div class="md-subhead">
                <md-icon>phonelink_ring</md-icon>
                <span class="text">123456789</span>
              </div>
            </md-card-header>

            <md-card-content>
              你好呀！
            </md-card-content>
          </md-card>
        </div>
        <div :style="{width:ItemWidth+'px'}" class="messageItem">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">刘小先森</div>
              <div class="md-subhead">
                <md-icon>email</md-icon>
                <span class="text">923035434@qq.com</span>
              </div>
              <div class="md-subhead">
                <md-icon>phonelink_ring</md-icon>
                <span class="text">123456789</span>
              </div>
            </md-card-header>

            <md-card-content>
              你好呀！
            </md-card-content>
          </md-card>
        </div>
        <div :style="{width:ItemWidth+'px'}" class="messageItem">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">刘小先森</div>
              <div class="md-subhead">
                <md-icon>email</md-icon>
                <span class="text">923035434@qq.com</span>
              </div>
              <div class="md-subhead">
                <md-icon>phonelink_ring</md-icon>
                <span class="text">123456789</span>
              </div>
            </md-card-header>

            <md-card-content>
              你好呀！
            </md-card-content>
          </md-card>
        </div>
        <div :style="{width:ItemWidth+'px'}" class="messageItem">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">刘小先森</div>
              <div class="md-subhead">
                <md-icon>email</md-icon>
                <span class="text">923035434@qq.com</span>
              </div>
              <div class="md-subhead">
                <md-icon>phonelink_ring</md-icon>
                <span class="text">123456789</span>
              </div>
            </md-card-header>

            <md-card-content>
              你好呀！
            </md-card-content>
          </md-card>
        </div>
        <div :style="{width:ItemWidth+'px'}" class="messageItem">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">刘小先森</div>
              <div class="md-subhead">
                <md-icon>email</md-icon>
                <span class="text">923035434@qq.com</span>
              </div>
              <div class="md-subhead">
                <md-icon>phonelink_ring</md-icon>
                <span class="text">123456789</span>
              </div>
            </md-card-header>

            <md-card-content>
              你好呀！
            </md-card-content>
          </md-card>
        </div>
        <div :style="{width:ItemWidth+'px'}" class="messageItem">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">刘小先森</div>
              <div class="md-subhead">
                <md-icon>email</md-icon>
                <span class="text">923035434@qq.com</span>
              </div>
              <div class="md-subhead">
                <md-icon>phonelink_ring</md-icon>
                <span class="text">123456789</span>
              </div>
            </md-card-header>

            <md-card-content>
              你好呀！
            </md-card-content>
          </md-card>
        </div>
      </md-layout>
    </md-layout>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        ItemWidth: 240
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .messageBoard
    width: 100%
    height :100%
    padding: 40px
    overflow :scroll
    .messageItem
      margin:20px
      .text
        padding-left:8px
</style>
