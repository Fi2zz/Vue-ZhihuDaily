import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import actions from "./actions";
import types from "./types";
const date = new Date();

function padding(number) {
  return parseInt(number) > 9 ? `${number}` : `0${number}`;
}

let currYear = date.getFullYear();
let currMonth = padding(date.getMonth() + 1);
let currDate = padding(date.getDate());
let string = `${currYear}${currMonth}${currDate}`;

const store = new Vuex.Store({
  state: {
    stories: [],
    tops: [],
    story: {
      id: "",
      next: "",
      content: "",
      likes: 0,
      comments: {
        long: { list: [], size: 0 },
        short: { list: [], size: 0 },
        total: 0
      }
    },
    loading: false,
    currentDate: parseInt(string),
    lazyLoading:
      "http://static.daily.zhihu.com/img/new_home_v3/mobile_top_logo.png"
  },
  mutations: {
    [types.LOADING](state, loading) {
      state.loading = loading;
    },
    [types.UPDATE_STORY_INFO](state, data) {
      state.story.likes = data.likes;
      state.story.comments = data.comments;
    },
    [types.UPDATE_STORY](state, data) {
      state.story.id = data.id;
      state.story.content = data.content;
    },
    [types.UPDATE_STORY_COMMENT](state, data) {
      state.story.comments.short.list = data.short;
      state.story.comments.long.list = data.long;
    },
    [types.UPDATE_TOPS](state, data) {
      state.tops = data;
    },
    [types.UPDATE_LIST](state, data) {
      state.stories = data;
    },
    [types.UPDATE_VIEW_DATE](state, date) {
      state.currentDate = date;
    }
  },
  actions
});

export default store;
