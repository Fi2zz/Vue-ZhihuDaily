import Vue from 'vue'
import Router from 'vue-router'

import Index from  './index.vue'
import Article from './article.vue'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: "/:id",
            name: 'article',
            component: Article
        }
    ]
})
