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
        })
        vm.$store.commit('fetchStoryInfo', {id: id,vm:vm});
    },
    fetchStoryInfo(state, payload){
        let id = state.story.id;
        let vm = payload.vm;
        let url = `${routes.uri}${routes.storyInfo}${id}`;
        vm.$http.get(url).then(res => {
            let data = res.body;
            state.story.info.like = data.likes;
            state.story.info.popularity = data.popularity;
            state.story.info.comments = data.comments
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
            state.comments.total = 0;
            vm.$http.get(url.path).then(res => {
                console.log(res)
                let comments = res.body.comments;
                state.comments[url.type] = comments;
                state.comments.total += comments.length
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

