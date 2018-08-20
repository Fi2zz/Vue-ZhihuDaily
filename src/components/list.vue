<template>
    <div class="view list-view">
        <div class="view-title">
            <div class="view-title-wrap">{{viewTitle}}</div>
        </div>
        <div class="view-swiper" style="position: relative; z-index: 7;">
            <div class="swiper-container app-list-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-lazy swiper-slide"
                     v-for="item in tops" 
                     :key="item.id" 
                     :style="item.style" 
                     @click="getArticle(item.id)">
                     </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="view-list" ref="viewList">
            <div class="view-list-container" :id="view.date" v-for="(view,index) in stories" :key="index">
                <div class="view-list-title">
                    <div class="view-list-title-wrap">{{view.displayDate}}</div>
                </div>
                <ol class="view-list-list">
                    <li class="view-list-item" v-for="(item) in view.list" :key="item.id" @click="getArticle(item.id)">
                        <h3 class="view-list-item-title">{{item.title}}</h3>
                        <div class="view-list-item-image">
                            <div class="view-list-item-cover" :style="item.style"></div>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>


<style src="../../node_modules/swiper/dist/css/swiper.css">
</style>
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
      scrollDown: false
    };
  },
  computed: {
    ...mapState({
      tops: state => state.tops,
      isLoading: state => state.loading,
      stories: state => state.stories,
      currentViewDate: state => state.currentDate,
      lazyLoading: state => state.lazyLoading
    })
  },
  mounted() {
    this.$nextTick(() => {
      new Swiper(".swiper-container", {
        autoplay: 0,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        observer: true,
        lazyload: true
      });
    });
    this.$addEvent(window, "scroll", this.getScrollState, false);
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
      const viewPort = {
        height: window.screen.height
      };

      this.$nextTick(() => {
        let views = document.querySelectorAll("ol");
        let scrollDown = scrollTop > this.scrollPosition;
        if (views.length > 0) {
          let firstView = views[0];
          let rect = firstView.getBoundingClientRect();
          let top = parseInt(rect.top) - 240;
          if (scrollDown) {
            this.viewTitleActivated = scrollTop >= 44;
            if (top < viewPort.height * -1 && scrollTop > 0) {
            }
            let lastView = views[views.length - 1];
            let rect = lastView.getBoundingClientRect();
            let bottom = parseInt(rect.bottom);
            if (bottom === window.screen.height && this.isLoading === false) {
              this.$store.dispatch("getLastDateStories");
            }
          } else {
          }
        }
        this.scrollPosition = scrollTop;
      });
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