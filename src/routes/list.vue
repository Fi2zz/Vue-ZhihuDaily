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
                    <div class="swiper-lazy swiper-slide" v-for="item in tops" :key="item.id"
                         :style="setCoverStyle(item.image)" @click="getArticle(item.id)"></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="view-list" ref="viewList">
            <div class="view-list-container"
                 :id="view.date"
                 v-for="(view,index) in stories"
                 :key="index"
            >
                <div class="view-list-title" v-if="index !==0">
                    <div class="view-list-title-wrap">{{getDate(view.date)}}</div>
                </div>
                <ol class="view-list-list">
                    <li class="view-list-item"
                        v-for="(item,index) in view.list"
                        :key="item.id"
                        @click="getArticle(item.id,view.list[index+1])">
                        <h3 class="view-list-item-title">
                            {{item.title}}
                        </h3>
                        <div class="view-list-item-image">
                            <div class="view-list-item-cover" :style="setCoverStyle(item.images[0])"></div>
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
    import {mapState} from "vuex";
    const date = new Date();
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
                lazyLoading: "http://static.daily.zhihu.com/img/new_home_v3/mobile_top_logo.png",
                viewTitleActivated: false,
                viewTitle: DEFAULT_VIEW_TITLE,
                sectionTitleList: [],
                currentList: {},
                scrollPosition: 0,
                breakPoint: false,
                scrollDown: false,
                sections: []
            };
        },
        computed: {
            ...mapState({
                tops: state => state.tops,
                isLoading: state => state.loading,
                stories: state => state.stories
            }),
            currentViewDate() {
                return parseInt(
                    `${date.getFullYear()}${this.padding(date.getMonth() + 1)}${padding(
                        date.getDate()
                    )}`
                );
            }
        },
        mounted() {
            this.$nextTick(() => {
                new Swiper(".swiper-container", this.swipeOpts);
                this.viewList = () => {
                    const ref = this.$refs["viewList"];
                    return ref ? ref.querySelectorAll("ol") : false;
                };
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
            getDate(string) {
                let currDate = new Date();
                let year, month, date;
                if (!string) {
                    year = currDate.getFullYear();
                    month = currDate.getMonth();
                    date = currDate.getDate();
                } else {
                    year = parseInt(string.substring(0, 4));
                    month = parseInt(string.substring(4, 6));
                    date = parseInt(string.substring(6, 8));
                }
                let appDate = new Date(year, month - 1, date);
                let week = [
                    "星期日",
                    "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六"
                ];
                return `${appDate.getFullYear()}年${this.padding(
                    appDate.getMonth() + 1
                )}月${this.padding(appDate.getDate())}日 ${week[appDate.getDay()]}`;
            },
            getScrollState() {
                let scrollTop = window.scrollY;
                const viewPort = {
                    height: window.screen.height
                };

                this.$nextTick(() => {
                    let views = this.viewList();
                    let scrollDown = scrollTop > this.scrollPosition;
                    let firstView = views[0];

                    if (views) {
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
                                --this.currentViewDate;
                                this.dispatch("getLastDateStories", this.currentViewDate);
                            }
                        } else {
                        }
                    }

                    this.scrollPosition = scrollTop;
                });
            },
            getArticle(id, next) {
                let path;
                if (next) {
                    path = `/${id}&next=${next.id}`
                }
                else {
                    path = "/${id}"
                }
                this.$router.push({path});
            },
            setCoverStyle(image) {
                return {
                    background: `url(${image})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                };
            }
        }
    };
</script>
