<template>
    <div class="view list-view">
        <div class="view-title">
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
            <div class="view-list-container" v-for="(view,index) in viewStories">
                <div class="view-list-title" v-if="index !==0">
                    <div class="view-list-title-wrap">{{getDate(view.date)}}</div>
                </div>
                <ol class="view-list-list" :id="view.date">
                    <li class="view-list-item" v-for="item in view.list" @click="getArticle(item.id,index)">
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

    const DEFAULT_VIEW_TITLE = '今日热闻';

    const date = new Date();
    const DEFAULT_DATE = `${date.getFullYear()}${padding(date.getMonth() + 1)}${padding(date.getDate())}`;

    const DEFAULT_DAY = date.getDay()
    const DEFAULT_LAST_SUNDAY = `${date.getFullYear()}${padding(date.getMonth() + 1)}${padding(date.getDate() - DEFAULT_DAY)}`

    console.log(DEFAULT_LAST_SUNDAY)

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
                currentViewDate: DEFAULT_DATE
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
                new Swiper('.swiper-container', this.swipeOpts)
                this.viewList = () => {
                    const ref = this.$refs['viewList'];
                    return ref ? ref.querySelectorAll('ol') : false
                };
            });
            window.addEventListener('scroll', this.getScrollState, false)
        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                vm.commit('fetchData');
            })
        },
        methods: {
            getScrollState(){
                let scrollTop = window.scrollY;
                this.viewTitleActivated = scrollTop >= 44;

                this.$nextTick(() => {


                    let viewList = this.viewList(),
                        length = viewList.length;
                    let lastViewList;
                    let scrollDown = scrollTop > this.scrollPosition;

                    let lastDate;

                    if (scrollDown) {

                        lastDate = this.currentViewDate
                        lastViewList = viewList[length - 1];
                        let rect = lastViewList.getBoundingClientRect();

                        let bottom = parseInt(rect.bottom);
                        let top = parseInt(rect.top);

                        if (bottom === window.screen.height && this.isLoading === false) {
                            let date = Number(this.currentViewDate);
                            this.currentViewDate = `${--date}`;
                            this.commit('fetchLastDate', {date: this.currentViewDate})
                        }
                        if (top <= 88) {
                            this.viewTitle = getDate(this.currentViewDate)// : DEFAULT_VIEW_TITLE;
                        }
                    } else {

                        let total = length;


                        lastViewList = viewList;

                        for (let view of viewList) {
                            let rect = view.getBoundingClientRect();
                            let bottom = parseInt(rect.bottom);
                            if (bottom * -1 <= window.screen.height) {
                                console.log(view.id)
                            }
                        }
                    }

                    this.scrollPosition = scrollTop;
                })


            },
            getArticle(id, index){
                this.routing(`/story/${id}`, {params: {mmm: '111'}, query: {index}})
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
