import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


export default  new Vuex.Store({


  state: {
    stories: [],
    tops: [],
    currentIndex: 0,
    currentId: null,
    date:null
  },
  mutations: {
    setStories(state, payload){
      state.stories = payload
      console.log(state, payload)
    },
    setRoute(state, payload){
      let vm = payload.vm,
        name = payload.name;
      if (name === 'index') {
        vm.$http.get(`${vm.$uri}${vm.$query.list}`).then(res => {
          console.log(res)
          let data = res.body || res.data
          state.stories = data.stories;
          state.tops = data.top_stories
          state.date =data.date
        })
      }


    }
  }


})
