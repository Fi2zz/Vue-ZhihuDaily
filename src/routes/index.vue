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
                    <div class="swiper-lazy swiper-slide" v-for="item in hot" :key="item.id"
                         :style="setCoverStyle(item.image)" @click="getArticle(item.id)"></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="view-list" ref="viewList">
            <div class="view-list-container" :id="view.date" v-for="(view,index) in viewStories">
                <div class="view-list-title" v-if="index !==0">
                    <div class="view-list-title-wrap">{{getDate(view.date)}}</div>
                </div>
                <ol class="view-list-list">
                    <li class="view-list-item" v-for="(item,index) in view.list"
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

<style>

    * {
        word-wrap: break-word;
        word-break: break-all;
    }

</style>
<script>


    import Swiper from 'swiper'
    import '../../node_modules/swiper/dist/css/swiper.min.css'

    import mixins  from '../mixins'
    import {padding, getDate} from '../utils'
    const date = new Date();
    const DEFAULT_VIEW_TITLE = '今日热闻';
    const DEFAULT_DATE = `${date.getFullYear()}${padding(date.getMonth() + 1)}${padding(date.getDate())}`;
    export default{
        name: 'index',
        mixins: [mixins],
        data(){
            return {
                swipeOpts: {
                    autoplay: 0,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    observer: true,
                    lazyload: true
                },
                lazyLoading: 'http://static.daily.zhihu.com/img/new_home_v3/mobile_top_logo.png',
                viewStories: this.$store.state.stories,
                viewTitleActivated: false,
                viewTitle: DEFAULT_VIEW_TITLE,
                sectionTitleList: [],
                currentList: {},
                scrollPosition: 0,
                breakPoint: false,
                scrollDown: false,
                sections: [],
                isLoading: this.$store.state.loading,
                currentViewDate: Number(DEFAULT_DATE)
            }
        },
        computed: {
            hot(){
                let store = this.state.tops;
                if (!store) {
                    return []
                }
                return store
            }

        },
        mounted(){
            this.$nextTick(() => {
                new Swiper('.swiper-container', this.swipeOpts);
                this.viewList = () => {
                    const ref = this.$refs['viewList'];
                    return ref ? ref.querySelectorAll('ol') : false
                };
            });
            this.$addEvent(window, 'scroll', this.getScrollState, false)

        },
        beforeDestroy(){
            this.$removeEvent(window, 'scroll', this.getScrollState, false)
        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                vm.commit('fetchData');
            })
        },
        methods: {
            getScrollState(){
                let scrollTop = window.scrollY;
                const viewPort = {
                    height: window.screen.height
                };

                this.$nextTick(() => {
                    let views = this.viewList();
                    let scrollDown = scrollTop > this.scrollPosition;
                    let firstView = views[0];
                    let rect = firstView.getBoundingClientRect();
                    let top = parseInt(rect.top) - 240;
                    if (scrollDown) {

                        this.viewTitleActivated = scrollTop >= 44;
                        if (top < viewPort.height * -1 && scrollTop > 0) {
                            this.viewTitleActivated = false
                        }

                        let lastView = views[views.length - 1];

                        let rect = lastView.getBoundingClientRect();
                        let bottom = parseInt(rect.bottom);
                        if (bottom === window.screen.height && this.isLoading === false) {
                            --this.currentViewDate ///= `${--date}`;
                            this.commit('fetchLastDate', {date: this.currentViewDate})
                        }


                    } else {


                    }
                    this.scrollPosition = scrollTop;
                })
            },
            getArticle(id, next){

                this.$router.push({path: `/${id}`, query: {nextId: next ? next.id : ''}},)
//                console.log(id,nextId)
            },
            setCoverStyle(image){
                return {
                    background: `url(${image})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }
            }
        }
    }
</script>
