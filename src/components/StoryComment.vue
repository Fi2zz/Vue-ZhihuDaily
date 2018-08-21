<template>
  <div class="comments view-comment">
    <div class="view-header">
      <div class="view-header-wrap">{{info.total}}条点评
      </div>
    </div>
    <div class="view-comment-content comment-group">
      <ul class="view-comment-list list-group">
        <template v-for="(item,index) in comments">
          <li :key="index" class="list-group-header" v-if="item.type==='heading'">
            <h3 v-text="item.label"></h3>
          </li>
          <li :key="index" class="list-group-item" v-else-if="item.type==='item'">
            <div class="bio">
              <div class="avatar">
                <img :src="item.avatar"/>
              </div>
              <span class="bio-name">{{item.author}}</span>
              <span class="like">
              <i class="icon icon-like"></i>
              {{item.likes}}
              </span>
            </div>
            <div class="content">
              {{item.content}}
              <small style="display: block;margin-top: 8px;">
                {{(item.time)}}
              </small>
            </div>
          </li>
        </template>


      </ul>
    </div>
    <div class="view-bar">
      <div class="view-bar-wrap">
        <div class="post-a-comment">写评论</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Comments",
  computed: {
    ...mapState({
      comments: state => state.story.comments,
      info: state => state.story.info
    })
  }
};
</script>
