<template>
  <div class="ilickTheMusic">
    <div class="float-block search-wrapper">
      <div class="search">
        <input type="text">
      </div>
      <div class="icon">
        <md-icon>search</md-icon>
      </div>
    </div>
    <div class="float-block search-result-wrapper">
      <md-tabs class="md-warn" md-right>
        <md-tab md-icon="my_library_music">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-tab>

        <md-tab md-icon="face">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-tab>
      </md-tabs>
    </div>
    <div class="float-block serch-select-simger-wrapper">
      <div class="phone-viewport">
        <md-list>
          <md-subheader>Contacts</md-subheader>

          <md-list-item>
            <span>Abbey Christansen</span>

            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">chat_bubble</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </div>
    </div>
    <div class="float-block singer-wrapper">
      <div class="phone-viewport">
        <md-list class="custom-list md-triple-line">
          <md-subheader class="md-inset">Today</md-subheader>
          <md-list-item>
            <md-avatar>
              <img src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000" alt="People">
            </md-avatar>
            <div class="md-list-text-container">
              <span>Ali Connors</span>
            </div>
            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">star</md-icon>
            </md-button>

            <md-divider class="md-inset"></md-divider>
          </md-list-item>
        </md-list>
      </div>
    </div>
    <div class="float-block ilike-select-simger-wrapper">
      <div class="phone-viewport">
        <md-list>
          <md-subheader>Contacts</md-subheader>

          <md-list-item>
            <span>Abbey Christansen</span>

            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">chat_bubble</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .ilickTheMusic
    position :relative
    width :100%
    height:100%
    .float-block
      position :absolute
      border-radius: 3px
      border: 1px solid rgba(83, 88, 88, 0.15)
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)
    .search-wrapper
      top :0px
      right :10%
      width: 300px
      height: 40px
      display :flex
      .search
        flex :1
        input
          height: 100%
          width: 100%
          border: 0 none
          padding:11px
          color : #333
          font-size :14px
          outline:none
      .icon
        flex :0 0 40px
        height:40px
        text-align :center
        line-height :40px
        font-size:16px
        cursor :pointer
        color :#b3b2b2
        &:hover
          color :#2196f3
    .search-result-wrapper
      top: 60px
      left: 5%
      width:50%
      height: 40%
    .singer-wrapper
      top: 60px
      right :10%
      overflow-y :auto
      overflow-x :hidden
      width:30%
      height: 40%
    .serch-select-simger-wrapper
      top: 50%
      left: 5%
      width:40%
      height: 50%
    .ilike-select-simger-wrapper
      top: 50%
      right :10%
      width:40%
      height: 50%
</style>
