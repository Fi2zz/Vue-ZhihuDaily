<template>
  <div class="view view-article">
    <div class="app-article-main" ref="content" v-html="story.content"></div>
    <div class="view-bar">
      <div class="view-bar-wrap">
        <div class="view-bar-item view-prev" @click="back">
          <span class="icon icon-arrow-left"></span>
        </div>
        <div class="view-bar-item view-next"></div>
        <div class="view-bar-item view-like">
          <span class="icon icon-like"></span>
          <span class="text">{{story.likes}}</span>
        </div>
        <div class="view-bar-item view-share">
          <span class="icon icon-share"></span>
        </div>
        <div class="view-bar-item view-comments" @click="readComments">
          <span class="icon icon-comment"></span>
          <span class="text">{{story.totalCommentSize}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Story",
  data() {
    return {
      cleanTimer: false
    };
  },
  computed: {
    ...mapState({
      story: state => state.story,
      id: state => state.story.id
    })
  },
  beforeRouteEnter(from, to, next) {
    next(vm => {
      vm.getStory(from.params);
      vm.fetchInfo();
    });
  },
  mounted() {
    this.fetchInfo();
  },
  beforeRouteLeave(to, from, next) {
    this.cleanTimer = true;
    next();
  },
  methods: {
    ...mapActions(["getStory"]),
    fetchInfo(id) {
      let timer = setInterval(() => {
        if (this.cleanTimer) {
          clearInterval(timer);
          return false;
        }
        this.$store.dispatch("getStoryInfo", { id: this.story.id });
      }, 5000);
    },
    back() {
      this.$router.back({ path: "/" });
    },
    readComments() {
      this.$router.push({ path: `/${this.story.id}/comments` });
    }
  }
};
</script>