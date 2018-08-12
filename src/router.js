import Vue from "vue";
import Router from "vue-router";
import Stories from "./components/list.vue";
import Story from "./components/article.vue";
import Comment from "./components/comments.vue";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Stories
    },
    {
      path: "/:id",
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
