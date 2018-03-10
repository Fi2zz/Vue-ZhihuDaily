import Vue from 'vue'
import App from './main.vue'
import VueResource from 'vue-resource'
import store from './vuex/store'
import router from './routes/index'


require('./flexible');
Vue.use(VueResource);


Vue.prototype.$uri = window.location.protocol + '//' + window.location.hostname + ':8000/';
Vue.prototype.$query = {
    cover: 'prefetch-image', //启动封面，不一定存在
    list: 'latest', //最新消息
    article: 'story', //文章详情
    storyExtra: 'story-extra/', //文章的点评/赞之类的
    longComments: 'long-comments',//文章长评，
    shortComments: 'short-comments',//文章短评论
    themes: 'theme',//主题日报
    older: '/before',  //过往消息
    storyInfo(id, type){
        return `story/${id}/${type}`
    }
};

Vue.prototype.$addEvent = function (el, event, handler, userCapture = false) {
    el.addEventListener(event, handler, userCapture)
};
Vue.prototype.$removeEvent = function (el, event, handler, userCapture = false) {
    el.removeEventListener(event, handler, userCapture)
};

Vue.prototype.$padding = (number) => number > 9 ? number : `0${number}`;

window.vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
