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
  import debounce from '../debounce'

  import _ from 'lodash'



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
        sections: []
      }
    },
    watch: {
      currentList: {
        deep: true,
        handler(d){
          console.log(d)
        }
      },
      sections(l)
      {
          console.log(l)
      },
      currentViewDate(date){
        this.sections.push(date);
        setTimeout(() => {
          if (Number(date) > DEFAULT_LAST_SUNDAY) {
          }
        }, 2000);
      },
      sectionTitleList(date){
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
      currentViewDate(){
        return this.state.currentDate
      }
    },
    mounted(){
      this.$nextTick(() => {
        new Swiper('.swiper-container', this.swipeOpts)
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
        let fetched = false;
//        lastDate = this.currentViewDate;

        this.$nextTick(() => {
          let scrollViewList = this.$refs['viewList'];
          if (scrollViewList) {
            let scrollViewTitle = scrollViewList.querySelectorAll('.view-list-title');


            for (let i = 0; i < scrollViewTitle.length; i++) {
              let item = scrollViewTitle[i];
              let rect = item.getBoundingClientRect();
              let top = rect.top;


              let prect =item.parentNode.getBoundingClientRect();

              if(prect.bottom===window.screen.height){

                this.commit('fetchLastDate', {date:this.currentViewDate})

              }

              this.viewTitle = scrollTop >= 44 ? getDate(this.currentViewDate) : DEFAULT_VIEW_TITLE;
              this.scrollDown = scrollTop > this.scrollPosition;
              this.scrollPosition = scrollTop;


            }


          }


        });
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
