<template>
  <pop position="bottom" v-model="visible">
    <div class="share" :style="resize">

      <div class="share-panel">
        <div class="share-heading">分享这篇内容</div>
        <div class="share-list">

          <button>

            <div></div>
            <span>微信好友</span>

          </button>
          <button>

            <div></div>
            <span>微信朋友圈</span>


          </button>
          <button>
            <div></div>
            <span>新浪微博</span>

          </button>
          <button>

            <div></div>
            <span>复制链接</span>
          </button>
          <button>

            <div></div>
            <span>信息</span>
          </button>


        </div>


      </div>
      <button class="button button-primary">收藏</button>
      <button class="button button-default" @click="visible=false">取消</button>
    </div>
  </pop>
</template>
<style scoped lang="stylus">
  @import "../../stylus/vars/vars.styl"
  button:focus,
  button:active
    outline: none

  .popup
    background: none

  .share
    display: block
    min-height 44px
    margin 0 auto 8px

    > .button
      display: block
      width 100%
      font-size 14px
      text-align: center
      background $brand-default
      border-radius 12px
      height: 44px
      border: none
      appearance: none
      margin-bottom: 8px
    .share-heading
      color darken($brand-gray, 15%)
      font-weight: normal
      font-size: 10px
      text-align: center
      padding-bottom: 8px
    .share-panel
      overflow: hidden
      background $brand-default
      margin-bottom: 8px
      border-radius 12px
      padding: 12px
    .share-list
      white-space nowrap
      overflow-x scroll
      -webkit-overflow-scrolling: touch;
      /*display: flex*/
      /*align-items flex-start*/
      /*justify-content flex-start*/
      text-align: left
      button
        display: inline-block
        vertical-align: top
        width: 64px
        height 88px
        background #fff
        position relative
        border: none
        padding: 0 !important
        line-height normal
        font-size: 0
        div
          width 64px
          height: 64px
          border 1px $brand-gray solid
          margin auto
          border-radius 8px
          position: absolute
          top: 0
          left: 50%
          transform translateX(-50%)

        span
          display: block
          position: absolute
          bottom: 0;
          left: 0
          right: 0
          text-align: center
          font-size: 10px


</style>
<script>


  const viewport = {
    width: window.screen.width,
    height: window.screen.height
  };
  import pop from '../pop'
  export default{
    name: 'share',
    components: {
      pop
    },
    props: {
      value: Boolean
    },
    data(){
      return {
        visible: false
      }
    },
    watch: {
      visible(visible){
        this.$emit('input', visible);

      },
      value(value){
        this.visible = value
      }
    },
    computed: {
      resize(){
        return {width: viewport.width - 16 + 'px'}
      }
    }

  }

</script>
