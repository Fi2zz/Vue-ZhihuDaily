import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'


Vue.use(VueResource);


new Vue({
    el: '#app',
    mounted(){
        console.log('get')
        this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/last-stories').then(res => {
            console.log(res)
        })
    },
    render: h => h(App)
})
