import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


let port = 8000
const routes = {
  uri: `${window.location.protocol }//${window.location.hostname}:${port}`,
  list: '/',
  before: '/before',
  story: '/story/',
  storyInfo: '/story-extra/'
};


import {getDate,padding} from '../utils'

const date =new Date();

const DEFAULT_DATE = `${date.getFullYear()}${padding(date.getMonth() + 1)}${padding(date.getDate())}`;



export default  new Vuex.Store({
  state: {
    hot: [],
    stories: [],
    tops: [],
    currentDate: DEFAULT_DATE,
    currentIndex: 0,
    currentId: null,
    date: [],
    isFetched: false,
    ready: false,
    story: {
      id: '',
      content: '',
      info: {
        likes: 0,
        popularity: 0,
        comments: 0
      }
    },
    comments: {
      long: [],
      short: [],
      total: 0
    },

  },
  mutations: {
    routing(state, payload){

    },
    fetchStory(state, payload){


      let vm = payload.vm, id = payload.id;
      let url = `${routes.uri}${routes.story}${id}`;
      vm.$http.get(url).then(res => {
        console.log(res)
      })


    },
    fetchStoryInfo(state, payload){


      let id = state.story.id;
      let url = `${routes.uri}${routes.storyInfo}${id}`;
      vm.$http.get(url).then(res => {
        console.log(res)
      })

    },
    fetchComment(state, payload){


    },
    fetchData(state, payload){
      let vm = payload.vm
        , url = `${routes.uri}${routes.list}`;
      vm.$http.get(url).then(res => {
        let data = res.body || res.data;
        state.tops = data.top_stories;
        state.stories.push({
          date: data.date,
          list: data.stories,
        });
        vm.$store.commit('fetchLastDate', {date: Number(data.date), vm: vm})
      })
    },
    fetchLastDate(state, payload){
      let vm = payload.vm,
        date = payload.date,
        story = state.stories
      let url = `${routes.uri}${routes.before}/${date}`;
      vm.$http.get(url).then(res => {
        let data = res.body;
        story.push({
          date: data.date,
          list: data.stories,
        });
        state.currentDate =data.date
      });

    }
  }


})
