<template>
  <div class="story">
    <div ref="content" v-html="content"></div>
    <div class="story-action">
      <ul class="story-action-list">
        <li class="story-action-item story-back" @click="back">
          <span class="icon icon-arrow-left"></span>
        </li>
        <li class="story-action-item"></li>
        <li class="story-action-item  story-like">
          <span class="icon icon-like"></span>
          <span class="text">{{info.like}}</span>
        </li>
        <li class="story-action-item story-share">
          <span class="icon icon-share"></span>
        </li>
        <li class="story-action-item story-comments" @click="readComments">
          <span class="icon icon-comment"></span>
          <span class="text">{{info.total}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState, mapActions} from "vuex";
  export default {
    name: "Story",
    data() {
      return {
        cleanTimer: false,
        timer: null
      };
    },
    computed: {
      ...mapState({
        content: state => state.story.content,
        id: state => state.story.id,
        info: state => state.story.info
      })
    },
    beforeRouteEnter(from, to, next) {
      next(vm => {
        vm.getStory(from.params);
        vm.fetchInfo();
      });
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.timer);
      this.timer = null;
      next();
    },
    methods: {
      ...mapActions(["getStory", "getStoryInfo", "getStoryComments"]),
      fetchInfo(id) {
        this.timer = setInterval(() => {
          this.getStoryInfo({id: this.id});
        }, 5000);
      },
      back() {
        clearInterval(this.timer);
        this.timer = null;
        this.$router.back({path: "/"});
      },
      readComments() {
        this.$router.push({path: `/${this.id}/comments`});
      }
    }
  };
</script>
