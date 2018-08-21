<template>
  <div class="view list-view story-list">
    <div class="view-title">
      <div class="view-title-wrap">{{viewTitle}}</div>
    </div>
    <div class="view-swiper  " style="position: relative; z-index: 7;">
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
    <div class="list-group-container">
      <ol class="list-group">
        <template v-for="(item,index) in stories">
          <li class="list-group-item-header"
              :key="index"
              v-if="item.type==='separator'">
            <div class="view-list-title-wrap">{{item.content}}</div>
          </li>
          <li class="list-group-item" v-else-if="item.type==='item'" :key="index" @click="getArticle(item.id)">
            <h3 class="list-group-item-title">{{item.title}}</h3>
            <div class="list-group-item-image">
              <div class="list-group-item-cover" :style="item.style"></div>
            </div>
          </li>
        </template>
      </ol>
      <div v-show="isLoading" class="loading">加载中</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
const DEFAULT_VIEW_TITLE = "今日热闻";
export default {
  name: "Stories",
  data() {
    return {
      viewTitleActivated: false,
      viewTitle: DEFAULT_VIEW_TITLE,
      scrollPosition: 0,
      scrollDown: false,
      loading: false
    };
  },
  computed: {
    ...mapState({
      tops: state => state.tops,
      isLoading: state => state.loading,
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
        if (bottom === window.screen.height && this.isLoading === false) {
          this.$store.dispatch("getLastDateStories");
        }
      }
      this.scrollPosition = scrollTop;
    },
    getArticle(id, next) {
      const { $store: store } = this;
      store
        .dispatch("removeStory")
        .then(() => store.dispatch("goTo", { path: "/" + id }));
    }
  }
};
</script>
