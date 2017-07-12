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


function getDate(string,vm) {
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
               ${vm.$padding(appDate.getMonth() + 1)}月
               ${vm.$padding(appDate.getDate())}日
               ${week[appDate.getDay()]}`;
}


export default  new Vuex.Store({
  state: {
    stories: [],
    tops: [],
    currentIndex: 0,
    currentId: null,
    date: [],
    isFetched: false,
    ready: false,

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
          // state.stories = data.stories;
          state.tops = data.top_stories;
          // state.date = data.date;
          state.isFetched = true;
          state.ready = true
          state.stories.push({
            date: data.date,
            list: data.stories,
            title: getDate(data.date,vm)
          })
        })
      }
      if (name === 'last-date') {
        let date = payload.date;
        vm.$http.get(`${routes.uri}${routes.before}/${date}`).then(res => {
          let data = res.body;

          state.stories.push({
            date: data.date,
            list: data.stories,
            title: getDate(data.date,vm)
          })
        })
      }
    }
  }


})
