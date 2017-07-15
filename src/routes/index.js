import Vue from 'vue'
import Router from 'vue-router'

import Index from  './index.vue'
import ArticleItem from './article.vue'
import Comment from './article-comments.vue'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: "/story/:id",
            name: 'article',
            component: ArticleItem
        },
        {
            path: '/story/:id/comments',
            name: 'comments',
            component: Comment
        }
    ]
})
