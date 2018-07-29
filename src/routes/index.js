import Vue from "vue";
import Router from "vue-router";
import Stories from "./list.vue";
import Story from "./article.vue";
import Comment from "./comments.vue";
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: Stories
        },
        {
            path: "/:id&next=:next",
            name: "article",
            component: Story
        },
        {
            path: "/:id/comments",
            name: "comments",
            component: Comment
        }
    ]
});
