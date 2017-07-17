import{routes} from './config'

export default {
  fetchStory(state, payload){
    let vm = payload.vm, id = payload.id;
    state.story.id = id;
    let url = `${routes.uri}${routes.story}${id}`;
    vm.$http.get(url).then(res => {
      let data = res.body;
      state.story.content = data.body;
      state.story.title = data.title;
      state.story.imageSource = data.image_source;
      state.story.cover = data.image;
    });
    vm.$store.commit('fetchStoryInfo', {id: id, vm: vm});
  },
  fetchStoryInfo(state, payload){
    let id = payload.id;
    let vm = payload.vm;
    let url = `${routes.uri}${routes.storyInfo}${id}`;
    vm.$http.get(url).then(res => {
      let data = res.body;
      state.story.like = data.popularity;
      state.story.comments.total = data.comments;
      state.story.comments.long.size = data.long_comments;
      state.story.comments.short.size = data.short_comments
    })
  },
  fetchComments(state, payload){
    let vm = payload.vm,
      id = payload.id;
    let urls = [
      {
        path: `${routes.uri}${routes.comments}/?id=${id}&type=long`,
        type: 'long'
      },
      {
        path: `${routes.uri}${routes.comments}/?id=${id}&type=short`,
        type: 'short'
      }
    ];
    for (let url of urls) {
      // state.story.comments.total = 0;
      vm.$http.get(url.path).then(res => {
        state.story.comments[url.type]['list'] = res.body.comments;
      })
    }
  },
  fetchData(state, payload){
    let vm = payload.vm
      , url = `${routes.uri}${routes.list}`;
    state.loading = true;
    vm.$http.get(url).then(res => {
      let data = res.body || res.data;
      state.tops = data.top_stories;
      state.stories.push({
        date: data.date,
        list: data.stories,
      });
      state.loading = false;
      state.currentDate = data.date
      // vm.$store.commit('fetchLastDate', {date: Number(data.date), vm: vm})
    })
  },
  fetchLastDate(state, payload){
    state.loading = true;
    let vm = payload.vm,
      date = payload.date,
      story = state.stories;
    let url = `${routes.uri}${routes.before}/${date}`;
    vm.$http.get(url).then(res => {
      let data = res.body;
      story.push({
        date: data.date,
        list: data.stories,
      });
      state.loading = false;
      state.currentDate = data.date
    });

  }
}

