<template>
  <div class="view list-view">
    <div class="view-title">
      <div class="view-title-wrap" :class="{'view-title-wrap-active':viewTitleActivated}">
        今日热闻
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
      <template v-for="(view,index) in viewStories">
        <div class="view-list-title" v-show="index>0">
          <div class="view-list-title-wrap">
            {{view.title}}
          </div>
        </div>
        <ol class="view-list-list">
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

<style>

  * {
    word-wrap: break-word;
    word-break: break-all;
  }

</style>
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
        viewTitleActivated: false
      }
    },
    watch: {
      fetched(fetched){
        let viewDate = this.viewStories[0].date;
        if (fetched) {
          if (!isNaN(Number(viewDate))) {
            this.commit('fetchData', {name: 'last-date', vm: this, date: viewDate - 1})
          }
        }
      },
      viewStories: {
        deep: true,
        handler(views){
          if (views.length === 1) {
            this.fetched = this.state.isFetched
          }
        }
      }
    },
    computed: {
      hot(){
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
      });
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
          let scrollViewList = this.$refs['viewList'];
          let scrollViewTitle = scrollViewList.querySelectorAll('.view-list-title');

          console.log(this.$el.getBoundingClientRect().top, window.scrollY);

          let scrollTop = window.scrollY;
          if (scrollTop >= 44) {
            this.viewTitleActivated = true
            scrollViewTitle[0].style.display = 'block';
          } else {
            this.viewTitleActivated = false
          }
        });
      },
      getArticle(id, index){
        this.$router.push({path: `/story/${id}`, query: {index}});
      },
      commit(cmd, value){
        this.$store.commit(cmd, value)
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
