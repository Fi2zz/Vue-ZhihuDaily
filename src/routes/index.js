import Vue from "vue";
import Router from "vue-router";

import List from "./list.vue";
import ArticleItem from "./article.vue";
import Comment from "./article-comments.vue";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: List
    },
    {
      path: "/:id&:next",
      name: "article",
      component: ArticleItem
    },
    {
      path: "/:id/comments",
      name: "comments",
      component: Comment
    }
  ]
});
