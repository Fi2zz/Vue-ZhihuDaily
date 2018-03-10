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
                <div class="view-bar-item view-share" @click="showPopup(true)">
                    <span class="icon icon-share"></span>
                </div>
                <div class="view-bar-item view-comments" @click="viewComment(story.id)">
                    <span class="icon icon-comment"></span>
                    <span class="text">{{story.comments.total}}</span>
                </div>
            </div>
        </div>
        <share v-model="popVisible"></share>
    </div>
</template>

<script>
import mixins from "../mixins";
import share from "../packages/share/index.vue";
export default {
  name: "story",
  mixins: [mixins],
  components: {
    share
  },
  data() {
    return {
      popVisible: false
    };
  },
  computed: {
    story: {
      get() {
        return this.$store.state.story;
      },
      set() {}
    }
  },
  beforeRouteEnter(from, to, next) {
    next(vm => vm.commit("fetchStory", from.params));
  },
  beforeRouteLeave(to, from, next) {
    this.fetchInfo(true);
    next();
  },
  methods: {
    showPopup(show) {
      this.popVisible = show;
    },
    fetchInfo(clear) {
      this.commit("fetchStoryInfo", { id: this.id });
      if (!clear) {
        this.timer = setTimeout(() => {
          this.fetchInfo(this, false);
        }, 1000 * 60);
      } else {
        clearTimeout(this.timer);
      }
    },
    viewComment(id) {
      this.$router.push({
        path: `/${id}/comments`
      });
    }
  }
};
</script>
