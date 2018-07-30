<template>
    <div class="view view-article">
        <div class="app-article-main" ref="content" v-html="story.content"></div>
        <div class="view-bar">
            <div class="view-bar-wrap">
                <div class="view-bar-item view-prev"
                     @click="$router.push({path:'/'})">
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
                <div class="view-bar-item view-comments" @click="$router.push({path: `/${story.id}/comments`})">
                    <span class="icon icon-comment"></span>
                    <span class="text">{{story.comments.total}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Story",
  computed: {
    story() {
      return this.$store.state.story;
    }
  },
  beforeRouteEnter(from, to, next) {
    next(vm => {
      vm.$store.dispatch("getStory", from.params);
      vm.fetchInfo();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.fetchInfo(true);
    next();
  },
  methods: {
    fetchInfo(clear) {
      this.timer = setInterval(() => {
        this.$store.dispatch("getStoryInfo", { id: this.id });
      }, 1000 * 60);
      if (clear) {
        clearInterval(this.timer);
      }
    }
  }
};
</script>
