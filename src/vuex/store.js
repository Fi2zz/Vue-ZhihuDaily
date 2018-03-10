import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import VueResource from "vue-resource";

Vue.use(VueResource);

const port = 8000;
const routes = {
  uri: `${window.location.protocol}//${window.location.hostname}:${port}`,
  list: "/",
  before: "/before",
  story: "/story/",
  storyInfo: "/story-extra/",
  comments: "/comment"
};
//本app沒有複雜的state，
// 故沒有使用action

const store = new Vuex.Store({
  state: {
    hot: [],
    stories: [],
    tops: [],
    currentIndex: 0,
    story: {
      id: "",
      next: "",
      content: "",
      likes: 0,
      popularity: 0,
      total: 0,
      long: 0,
      short: 0,
      comments: {
        long: { list: [], size: 0 },
        short: { list: [], size: 0 },
        total: 0
      }
    },
    loading: false
  },
  mutations: {
    fetchStory(state, payload) {
      let { id } = payload;
      state.story.id = id;
      let url = `${routes.uri}${routes.story}${id}`;
      Vue.http.get(url).then(res => {
        if (res.ok) {
          let data = res.body;
          let content = data.body;
          let contentList = content
            .split("\n")
            .filter(item => !!item)
            .map(line => {
              line = line.trim();
              if (/<div class="img-place-holder"><\/div>/.test(line)) {
                line = `<div class="img-place-holder"
                                         style="background-image: url(${
                                           data.image
                                         });
                                         background-size: cover">
                                            <small>图片来源:${
                                              data.image_source
                                            }</small>         
                                    </div>`;
              }
              if (/<h2 class="question-title"><\/h2>/.test(line)) {
                line = `<h2 class="question-title">${data.title}</h2>`;
              }
              return line;
            });
          state.story.content = contentList.join(" ");
        }
      });
      store.commit("fetchStoryInfo", { id });
    },
    fetchStoryInfo(state, payload) {
      let id = payload.id;
      let url = `${routes.uri}${routes.storyInfo}${id}`;
      Vue.http.get(url).then(res => {
        let data = res.body;
        state.story.like = data.popularity;
        state.story.comments.total = data.comments;
        state.story.comments.long.size = data.long_comments;
        state.story.comments.short.size = data.short_comments;
      });
    },
    fetchComments(state, payload) {
      let id = payload.id;
      let urls = [
        {
          path: `${routes.uri}${routes.comments}/?id=${id}&type=long`,
          type: "long"
        },
        {
          path: `${routes.uri}${routes.comments}/?id=${id}&type=short`,
          type: "short"
        }
      ];
      for (let url of urls) {
        Vue.http.get(url.path).then(res => {
          state.story.comments[url.type]["list"] = res.body.comments;
        });
      }
    },
    fetchData(state) {
      let url = `${routes.uri}${routes.list}`;
      state.loading = true;
      Vue.http.get(url).then(res => {
        let data = res.body || res.data;
        state.tops = data.top_stories;
        state.stories.push({
          date: data.date,
          list: data.stories
        });
        state.loading = false;
        state.currentDate = data.date;
        store.commit("fetchLastDate", { date: Number(data.date), vm: vm });
      });
    },
    fetchLastDate(state, payload) {
      state.loading = true;
      let date = payload.date,
        story = state.stories;
      let url = `${routes.uri}${routes.before}/${date}`;
      Vue.http.get(url).then(res => {
        let data = res.body;
        story.push({
          date: data.date,
          list: data.stories
        });
        state.loading = false;
        state.currentDate = data.date;
      });
    }
  }
});

export default store;
