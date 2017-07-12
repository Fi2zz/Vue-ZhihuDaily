<template>
  <div class="view list-view">
    <div class="view-swiper" style="position: relative; z-index: 7;">
      <div class="swiper-container app-list-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-lazy swiper-slide" v-for="item in top" :key="item.id"
               :style="setCoverStyle(item.image)" @click="getArticle(item.id)"></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="view-title">
      <div ref="viewTitle" class="view-title-wrap"> {{viewTitle}}</div>
    </div>



    <div class="list-view-title">
      {{viewTitle}}
    </div>
    <ol class="app-list-view" ref="viewList">
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
        state: this.$store.state,
      }
    },
    watch: {
      fetched(fetched){
        let viewDate = this.viewDate;
        if (fetched) {
          if (!isNaN(Number(viewDate))) {
            viewDate -= 1;
            this.commit('fetchData', {name: 'last-date', vm: this, date: viewDate})
          }
        }
      },
      viewDate(date){
          console.log(date)
      }
    },
    computed: {
      viewDate(){
        let store = this.state.date;
        if (store !== null) {
          return store[0]
        }
      },
      fetched(){
        return this.state.isFetched
      },
      viewTitle(){
        let viewDate = this.viewDate
        if (viewDate) {
          return this.getDate(viewDate)
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
        vm.commit('fetchData', {name: 'index', vm: vm})
      })
    },
    mounted(){
      window.addEventListener('scroll', this.getScrollState, false)
    },
    methods: {
      getScrollState(){
        let scrollTop = window.scrollY;
        this.$nextTick(() => {
          let scrollViewTitle = this.$refs['viewTitle'],
            scrollViewList = this.$refs['viewList'];
          if (scrollTop > 44) {
            scrollViewTitle.parentNode.classList.add('view-title-active');
            scrollViewTitle.classList.add('view-title-wrap-active')
          } else {
            scrollViewTitle.classList.remove('view-title-wrap-active')
            scrollViewTitle.parentNode.classList.remove('view-title-active')
          }
          this.viewDate = Number(this.viewDate) - 1;
          console.log(scrollTop, window.getComputedStyle(scrollViewList).height)
        });
      },
      getArticle(id, index){
        this.$router.push({path: `/story/${id}`, query: {index}});
      },
      commit(cmd, value){
        this.$store.commit(cmd, value)
      },
      getDate(string){
        let currDate = new Date();
        let year, month, date;
        if (!string) {
          year = currDate.getFullYear()
          month = currDate.getMonth()
          date = currDate.getDate()
        }
        year = Number(string.substring(0, 4));
        month = Number(string.substring(4, 6));
        date = Number(string.substring(6, 8));
        let appDate = new Date(year, month - 1, date);
        let currDateTime = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()).getTime();
        let appDateTime = appDate.getTime();


        let isCurrentDate = currDateTime === appDateTime;
        let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',];
        return isCurrentDate ? '今日新闻'
          : `${appDate.getFullYear()}年
               ${this.$padding(appDate.getMonth() + 1)}月
               ${appDate.getDate()}日
               ${week[appDate.getDay()]}`;
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
