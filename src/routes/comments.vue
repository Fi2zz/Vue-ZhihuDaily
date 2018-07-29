<template>
    <div class="view view-comment">
        <div class="view-header">
            <div class="view-header-wrap">
                {{comments.total}}条点评
            </div>
        </div>
        <div class="view-content">
            <div class="view-comment-length" @click="arrowDirection=!arrowDirection">共{{comments.long.size}}条长评
                <span :class="`double-arrows-${arrowDirection?'up':'down'}`"></span>
            </div>
            <div class="view-comment-list" v-show="arrowDirection">
                <div v-for="(item,index) in comments.long.list"
                     key="index"
                     class="view-comment-item">
                    <div class="view-comment-item-bio">
                        <div class="avatar">
                            <img :src="item.avatar" alt="">
                        </div>
                        <span class="bio-name">{{item.author}}</span>
                        <span class="like">
                        <span class="icon icon-like"></span>
                            {{item.likes}}
                        </span>
                    </div>
                    <div class="view-comment-item-content">
                        {{item.content}}
                        <small style="display: block;margin-top: 8px;">
                            {{getDateFromeTime(item.time)}}
                        </small>
                    </div>
                </div>
            </div>
            <div class="view-comment-length" @click="arrowDirection=!arrowDirection">共{{comments.short.size}}条短评
                <span :class="`double-arrows-${!arrowDirection?'up':'down'}`"></span>
            </div>
            <div class="view-comment-list" v-show="!arrowDirection">
                <div v-for="item in comments.short.list" class="view-comment-item">
                    <div class="view-comment-item-bio">
                        <div class="avatar">
                            <img :src="item.avatar" alt="">
                        </div>
                        <span class="bio-name">{{item.author}}</span>
                        <span class="like">
                        <span class="icon icon-like"></span>
                            {{item.likes}}
                        </span>
                    </div>
                    <div class="view-comment-item-content">
                        {{item.content}}
                        <small style="display: block;margin-top: 8px;">
                            {{getDateFromeTime(item.time)}}
                        </small>
                    </div>
                </div>
            </div>
        </div>
        <div class="view-bar">
            <div class="view-bar-wrap">
                <div class="post-a-comment"> 写评论</div>
            </div>
        </div>
    </div>
</template>
<style scoped="scoped" lang="stylus" src="../stylus/comment.styl"></style>
<script>
    export default {
        name: "Comments",
        data() {
            return {
                id: this.$route.params.id
            };
        },
        computed: {
            comments() {
                return this.$store.state.story.comments;
            },
            arrowDirection() {
                return this.$store.state.story.comments.long.size > 0;
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                let id = vm.id;
                vm.id = id;
                vm.$store.dispatch("getStoryComments", {id})
            });
        },
        created() {
            this.$store.dispatch("getStoryInfo", {id: this.id})
        },
        methods: {
            getDateFromeTime(time) {
                let date = new Date(time * 1000);
                return `
                ${date.getFullYear()}-${this.padding(
                    date.getMonth() + 1
                )}-${this.padding(date.getDate())}
                    ${this.padding(date.getHours())}:${this.padding(
                    date.getMinutes()
                )}
                `;
            }
        }
    };
</script>
