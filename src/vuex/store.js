import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


let port = 8000
const routes = {
  uri: `${window.location.protocol }//${window.location.hostname}:${port}`,
  list: '/latest',
  before: '/before'
};


console.log(routes)
export default  new Vuex.Store({
  state: {
    stories: [],
    tops: [],
    currentIndex: 0,
    currentId: null,
    date: [],
    isFetched: false
  },
  mutations: {
    setStories(state, payload){
      state.stories = payload
      console.log(state, payload)
    },
    fetchData(state, payload){
      let vm = payload.vm,
        name = payload.name;
      if (name === 'index') {
        vm.$http.get(`${routes.uri}${routes.list}`).then(res => {
          let data = res.body || res.data;
          state.stories = data.stories;
          state.tops = data.top_stories;
          state.date = [data.date];
          state.isFetched = true
        })
      }
      if (name === 'last-date') {
        let date = payload.date;
        vm.$http.get(`${routes.uri}${routes.before}/${date}`).then(res => {
          let data = res.body;
          state.date = [...state.date, ...data.date];
          state.stories = [...state.stories, ...data.stories]
        })
      }
    }
  }


})
