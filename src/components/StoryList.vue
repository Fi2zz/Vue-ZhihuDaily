<template>
  <div class="view story-list">
    <div class="story-swiper">
      <div class="swiper-container app-list-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-lazy swiper-slide"
               v-for="item in tops"
               :key="item.id"
               :style="item.style"
               @click="getArticle(item.id)">
            <div class="swiper-lazy-preloader"></div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <ol class="list-group">
      <template v-for="(item,index) in stories">
        <li class="list-group-item-header"
            :key="index"
            v-if="item.type==='separator'"
            v-text="item.content"></li>
        <li class="list-group-item"
            v-else-if="item.type==='item'"
            :key="index"
            @click="getArticle(item.id)">
          <h3 class="list-group-item-title" v-text="item.title"></h3>
          <div class="list-group-item-image">
            <div class="list-group-item-cover" :style="item.style"></div>
          </div>
        </li>
      </template>
    </ol>
    <div v-show="loading" class="loading">加载中</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";

export default {
  name: "StoryList",
  data() {
    return {
      scrollPosition: 0
    };
  },
  computed: {
    ...mapState({
      tops: state => state.tops,
      loading: state => state.loading,
      stories: state => state.stories
    })
  },
  mounted() {
    this.$nextTick(() => {
      new Swiper(".swiper-container", {
        autoplay: 0,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        observer: true,
        lazyLoading: true
      });
      this.$addEvent(window, "scroll", this.getScrollState, false);
    });
  },

  beforeDestroy() {
    this.$removeEvent(window, "scroll", this.getScrollState, false);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.$store.dispatch("getStories"));
  },
  methods: {
    getScrollState() {
      let scrollTop = window.scrollY;
      let scrollDown = scrollTop > this.scrollPosition;
      let rect = document.querySelector("ol").getBoundingClientRect();
      let bottom = parseInt(rect.bottom);
      if (scrollDown) {
        if (bottom === window.screen.height && this.loading === false) {
          this.$store.dispatch("getLastDateStories");
        }
      }
      this.scrollPosition = scrollTop;
    },
    getArticle(id, next) {
      const { $store: store, $router: router } = this;
      store.dispatch("resetStoryView");
      router.push({ path: "/" + id });
    }
  }
};
</script>
