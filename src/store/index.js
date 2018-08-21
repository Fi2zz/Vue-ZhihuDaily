import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import types from "./types";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    stories: [],
    tops: [],
    story: {
      id: null,
      content: "",
      comments: [],
      info: {
        total: 0,
        long: 0,
        like: 0,
        short: 0
      }
    },
    loading: false,
    lazyLoading:
      "http://static.daily.zhihu.com/img/new_home_v3/mobile_top_logo.png"
  },
  mutations: {
    [types.LOADING]: (state, loading) => (state.loading = loading),
    [types.UPDATE_STORY_INFO]: (state, info) => (state.story.info = info),
    [types.UPDATE_STORY](state, { id, content }) {
      state.story.id = id;
      state.story.content = content;
    },
    [types.UPDATE_STORY_COMMENT]: (state, comments) =>
      (state.story.comments = comments),
    [types.UPDATE_TOPS]: (state, tops) => (state.tops = tops),
    [types.UPDATE_LIST]: (state, stories) =>
      (state.stories = [...state.stories, ...stories])
  },
  actions
});

export default store;
