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
    <div class="view-list">
      <template v-for="view in viewStories">
        <div> {{view}} \n
        </div>
        <div class="view-list-title view-list-title-active" ref="viewTitle">
          <div class="view-list-title-wrap">
            {{view.title}}
          </div>
        </div>
        <ol class="view-list-list" ref="viewList">
          <li class="view-list-item" v-for="item in view.list" @click="getArticle(item.id,index)">
            <h3 class="view-list-item-title">
              {{item.title}}
            </h3>
            <div class="view-list-item-image">
              <div class="view-list-item-cover" :style="setCoverStyle(item.images[0])"></div>
            </div>
          </li>
        </ol>
      </template>
    </div>


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
        fetched: false,
        viewStories: this.$store.state.stories,
      }
    },
    watch: {
      fetched(fetched){
        let viewDate = this.viewStories[0].date;
        if (fetched) {
          if (!isNaN(Number(viewDate))) {
            viewDate -= 1;
            this.commit('fetchData', {name: 'last-date', vm: this, date: viewDate})
          }
        }
      },
      viewStories: {
        deep: true,
        handler(da){
          this.fetched = this.state.isFetched
        }
      }

    },
    computed: {
      top(){
        let store = this.state.tops;
        if (!store) {
          return []
        }
        return store
      },

    },
    mounted(){
      this.$nextTick(() => {
        new Swiper('.swiper-container', this.swipeOpts)

      })
      window.addEventListener('scroll', this.getScrollState, false)
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.commit('fetchData', {name: 'index', vm: vm})
      })
    },
    methods: {
      getScrollState(){
        let scrollTop = window.scrollY;
        this.$nextTick(() => {
          let scrollViewTitle = this.$refs['viewTitle'],
            scrollViewList = this.$refs['viewList'];
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
