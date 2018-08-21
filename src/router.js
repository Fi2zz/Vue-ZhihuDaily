import Vue from "vue";
import Router from "vue-router";
import StoryList from "./components/StoryList.vue";
import Story from "./components/Story.vue";
import StoryComment from "./components/StoryComment.vue";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: StoryList
    },
    {
      path: "/:id",
      name: "article",
      component: Story
    },
    {
      path: "/:id/comments",
      name: "comments",
      component: StoryComment
    }
  ]
});
