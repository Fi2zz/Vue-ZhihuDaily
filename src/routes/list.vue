<template>
    <div class="view list-view">
        <div class="view-title" v-show="viewTitleActivated">
            <div class="view-title-wrap" :class="{'view-title-wrap-active':viewTitleActivated}">
                {{viewTitle}}
            </div>
        </div>
        <div class="view-swiper" style="position: relative; z-index: 7;">
            <div class="swiper-container app-list-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-lazy swiper-slide" v-for="item in tops" :key="item.id" :style="item.style" @click="getArticle(item.id)"></div>
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
                    <li class="view-list-item" v-for="(item,index) in view.list" :key="item.id" @click="getArticle(item.id)">
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
    import Swiper from "swiper";
    import { mapState } from "vuex";
    const DEFAULT_VIEW_TITLE = "今日热闻";
    export default {
        name: "Stories",
        data() {
            return {
                swipeOpts: {
                    autoplay: 0,
                    pagination: ".swiper-pagination",
                    paginationClickable: true,
                    observer: true,
                    lazyload: true
                },
                viewTitleActivated: false,
                viewTitle: DEFAULT_VIEW_TITLE,
                sectionTitleList: [],
                currentList: {},
                scrollPosition: 0,
                breakPoint: false,
                scrollDown: false,
                sections: [],
            };
        },
        computed: {
            ...mapState({
                tops: state => state.tops,
                isLoading: state => state.loading,
                stories: state => state.stories,
                currentViewDate: state => state.currentDate,
                lazyLoading: state => state.lazyLoading
            }),
        },
        mounted() {
            this.$nextTick(() => {
                new Swiper(".swiper-container", this.swipeOpts);
            });
            this.$addEvent(window, "scroll", this.getScrollState, false);
        },
        beforeDestroy() {
            this.$removeEvent(window, "scroll", this.getScrollState, false);
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.dispatch("getStories")
            });
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
                                this.viewTitleActivated = false;
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
                this.$router.push({ path: "/" + id });
            },



        }
    };
</script>