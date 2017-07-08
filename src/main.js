import Vue from 'vue'
import App from './main.vue'
import VueResource from 'vue-resource'
import router from './routes/index'
require('./flexible')
Vue.use(VueResource);
Vue.prototype.$uri = window.location.protocol + '//' + window.location.hostname;
Vue.prototype.$query = {
    list: '/latest',
    article: '/article'
};
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
