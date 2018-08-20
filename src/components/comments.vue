<template>
    <div class="view view-comment">
        <div class="view-header">
            <div class="view-header-wrap">
                {{totalCommentsSize}}条点评
            </div>
        </div>
        <div class="view-content">
            <div class="view-comment-length" @click="changeArrowDirection">共{{longCommentsSize}}条长评
                <span :class="`double-arrows-${arrowDirection?'up':'down'}`"></span>
            </div>
            <div class="view-comment-list" v-show="arrowDirection">
                <div v-for="(item,index) in comments.long" :key="index" class="view-comment-item">
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
                            {{item.time}}
                        </small>
                    </div>
                </div>
            </div>
            <div class="view-comment-length" @click="changeArrowDirection">共{{shortCommentsSize}}条短评
                <span :class="`double-arrows-${!arrowDirection?'up':'down'}`"></span>
            </div>
            <div class="view-comment-list" 
                v-show="!arrowDirection">
                <div v-for="(item,index) in comments.short"
                    :key="index" 
                    class="view-comment-item"
                 >
                    <div class="view-comment-item-bio">
                        <div class="avatar">
                            <img :src="item.avatar"/>
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
                            {{(item.time)}}
                        </small>
                    </div>
                </div>
            </div>
        </div>
        <div class="view-bar">
            <div class="view-bar-wrap">
                <div class="post-a-comment">写评论</div>
            </div>
        </div>
    </div>
</template>
<style scoped="scoped" lang="stylus" src="../stylus/comment.styl"></style>
<script>
import { mapState } from "vuex";
export default {
  name: "Comments",
  data() {
    return {
      id: this.$route.params.id,
      arrowDirection: false
    };
  },
  computed: {
    ...mapState({
      comments: state => ({
        long: state.story.longComments,
        short: state.story.shortComments
      }),
      longCommentsSize: state => state.story.longCommentSize,
      shortCommentsSize: state => state.story.shortCommentSize,
      totalCommentsSize: state => state.story.totalCommentSize
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let id = vm.id;
      vm.id = id;
      vm.$store.dispatch("getStoryInfo", { id });
      vm.$store.dispatch("getStoryComments", { id });
    });
  },
  methods: {
    changeArrowDirection() {
      this.arrowDirection = !this.arrowDirection;
    }
  }
};
</script>
