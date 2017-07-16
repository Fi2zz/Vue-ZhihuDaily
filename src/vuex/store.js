import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


let port = 8000
const routes = {
    uri: `${window.location.protocol }//${window.location.hostname}:${port}`,
    list: '/',
    before: '/before',
    story: '/story/',
    storyInfo: '/story-extra/',
    comments: '/comment'
};


import {getDate, padding} from '../utils'

const date = new Date();

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
            },
            cover: ''
        },
        comments: {
            long: [],
            short: [],
            total: 0
        },
        loading: false

    },
    mutations: {
        routing(state, payload){


        },
        fetchStory(state, payload){
            let vm = payload.vm, id = payload.id;
            state.story.id = id;
            let url = `${routes.uri}${routes.story}${id}`;
            vm.$http.get(url).then(res => {

                let data = res.body;
                state.story.content = data.body;
                state.story.title = data.title;
                state.story.imageSource = data.image_source;
                state.story.cover = data.image

                console.log(data.image, res)
            })


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
                vm.$http.get(url.path).then(res => {
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
                vm.$store.commit('fetchLastDate', {date: Number(data.date), vm: vm})
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


})
