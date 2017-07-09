<template>
    <div class="view">
        <div class="swiper-container app-list-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-lazy swiper-slide" v-for="item in top" :key="item.id"
                     :style="setCoverStyle(item.image)" @click="getArticle(item.id)"></div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <ol class="app-list-view">
            <li class="app-list-view-item" v-for="story in stories" @click="getArticle(story.id)">
                <h3 class="app-list-view-item-title">{{story.title}} </h3>
                <div class="app-list-view-item-image">
                    <div class="app-list-view-item-cover" :style="setCoverStyle(story.images[0])"></div>
                </div>
            </li>
        </ol>
    </div>
</template>
<script>
    import Swiper from 'swiper'
    import '../../node_modules/swiper/dist/css/swiper.min.css'
    export default{
        name: 'index',
        data(){
            return {
                swipeOpts: {
                    autoplay: 0,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    observer: true,
                    lazyload: true
                },
                list: {},
                date: '',
                stories: [],
                top: [],
                url: `${this.$uri}${this.$query.list}`,
                appCover:`${this.$uri}${this.$query.cover}`,
                lazyLoading: 'http://static.daily.zhihu.com/img/new_home_v3/mobile_top_logo.png'
            }
        },

        created(){

            console.log(this.appCover)
            this.$http.get(this.appCover).then(res=>{
                console.log(res)
            })
        },
        mounted(){

            this.$http.get(this.url).then(res => {
                let data = res.body;
                this.stories = data.stories
                this.top = data.top_stories
            })

            this.$nextTick(() => {
                new Swiper('.swiper-container', this.swipeOpts)
            })
        },
        methods: {
            getArticle(id){
                this.$router.push({path: `/story/${id}`});
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