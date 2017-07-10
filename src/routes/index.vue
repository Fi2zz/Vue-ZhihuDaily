<template>
  <div class="view">
    <div class="swiper-container app-list-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-lazy swiper-slide" v-for="item in top" :key="item.id"
             :style="setCoverStyle(item.image)" @click="getArticle(item.id)"></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div style="text-align: center;font-size: 16px; height: 32px; line-height: 32px;border-bottom: 1px #ddd solid">
      {{date}}
    </div>
    <ol class="app-list-view">
      <li class="app-list-view-item" v-for="(story,index) in stories" @click="getArticle(story.id,index)">
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
        url: `${this.$uri}${this.$query.list}`,
        appCover: `${this.$uri}${this.$query.cover}`,
        lazyLoading: 'http://static.daily.zhihu.com/img/new_home_v3/mobile_top_logo.png',
        state:this.$store.state
      }
    },
    computed: {
      date(){
        let store = this.state.date;

        if (store !== null) {
          return this.getDate(store)
        }

      },
      top(){
        let store = this.state.tops;
        if (!store) {
          return []
        }
        return store
      },
      stories(){
        let store = this.state.stories;
        if (!store) {
          return []
        }
        return store
      }
    },
    mounted(){
      this.$nextTick(() => {
        new Swiper('.swiper-container', this.swipeOpts)
      })
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.commit('setRoute', {name: 'index', vm: vm})
      })
    },
    methods: {
      getArticle(id, index){
        this.$router.push({path: `/story/${id}`, query: {index}});
      },
      commit(cmd, value){
        this.$store.commit(cmd, value)
      },
      getDate(string){
        let currDate = new Date();
        let year, month, date
        if (!string) {
          year = currDate.getFullYear()
          month = currDate.getMonth()
          date = currDate.getDate()
        }
        year = Number(string.substring(0, 4));
        month = Number(string.substring(4, 6));
        date = Number(string.substring(6, 8));
        let newDate = new Date(year, month - 1, date);
        let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',];
        return `${newDate.getFullYear()}年${this.$padding(newDate.getMonth() + 1)}月${newDate.getDate()}日${
          week[newDate.getDay()]
          }`;
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
