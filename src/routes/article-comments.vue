<template>
  <div class="view view-comment">
    <div class="view-header">
      <div class="view-header-wrap">
        {{comments.total}}条点评
      </div>
    </div>
    <div class="view-content">
      <div class="view-comment-length" @click="arrowDirection=!arrowDirection">共{{comments.long.size}}条长评
        <span :class="`double-arrows-${arrowDirection?'up':'down'}`"></span>
      </div>
      <div class="view-comment-list" v-show="arrowDirection">
        <div v-for="item in comments.long.list" class="view-comment-item">
          <div class="view-comment-item-bio">
            <div class="avatar">
              <img :src="item.avatar" alt="">
            </div>
            <span class="bio-name">{{item.author}}</span>
            <span class="like">
                        <span class="icon icon-like"></span>
                            {{item.likes}}
                        </span>
          </div>
          <div class="view-comment-item-content">
            {{item.content}}
            <small style="display: block;margin-top: 8px;">
              {{getDateFromeTime(item.time)}}
            </small>
          </div>
        </div>
      </div>
      <div class="view-comment-length" @click="arrowDirection=!arrowDirection">共{{comments.short.size}}条短评
        <span :class="`double-arrows-${!arrowDirection?'up':'down'}`"></span>
      </div>
      <div class="view-comment-list" v-show="!arrowDirection">
        <div v-for="item in comments.short.list" class="view-comment-item">
          <div class="view-comment-item-bio">
            <div class="avatar">
              <img :src="item.avatar" alt="">
            </div>
            <span class="bio-name">{{item.author}}</span>
            <span class="like">
                        <span class="icon icon-like"></span>
                            {{item.likes}}
                        </span>
          </div>
          <div class="view-comment-item-content">
            {{item.content}}
            <small style="display: block;margin-top: 8px;">
              {{getDateFromeTime(item.time)}}
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class="view-bar">
      <div class="view-bar-wrap">
        <span class="icon icon-arrow-left" @click="routing(`/${id}`)"></span>
        <div class="post-a-comment"> 写评论</div>
      </div>
    </div>
  </div>
</template>
<style scoped="scoped" lang="stylus">

  .view-bar
    &-wrap
      span
        width: 44px
        height: 44px
        position: absolute
        left: 0
        top: 0
        bottom: 0
        line-height 44px
        text-align: center
        z-index: 9
      .post-a-comment
        display: block
        position: absolute
        left: 0
        right: 0
        bottom: 0
        top: 0
        z-index: 8
        text-align: center
        font-size: 16px
        line-height 44px

  .double-arrows

    &-down,
    &-up
      display: inline-block
      vertical-align: top
      width: 32px
      height: 32px
      position: relative
      &:before,
      &:after
        display: block
        width: 32px
        height: 32px
        content ''
        position: absolute
        left: 0
        right: 0
        transform rotate(45deg) scale(.3, .3) translate(-50%, -50%)

    &-up
      &:before,
      &:after
        border 4px #ddd solid
        border-right: none
        border-bottom: none

      &:before
        top 6px
      &:after
        top 10px
    &-down
      &:before,
      &:after
        border 4px #ddd solid
        border-left: none
        border-top: none
      &:before
        top 2px
      &:after
        top 6px


</style>

<script>
  import mixins  from '../mixins'
  export default{
    name: 'comments',
    mixins: [mixins],
    data(){
      return {
        id: this.$route.params.id,
        comments: this.$store.state.story.comments,
        arrowDirection: this.$store.state.story.comments.long.size>0,
      }
    },

    beforeRouteEnter(to, from, next){
      next(vm => {
        let id = vm.id;
        vm.id = id;
        vm.commit('fetchComments', {id});
      })
    },
    created(){
      this.commit('fetchStoryInfo', {id: this.id})
    },
    methods: {
      getDateFromeTime(time){
        let date = new Date(time * 1000);
        return `
                ${date.getFullYear()}-${this.padding(date.getMonth() + 1)}-${this.padding(date.getDate())}
                    ${this.padding(date.getHours())}:${this.padding(date.getMinutes())}
                `
      }
    }
  }
</script>
