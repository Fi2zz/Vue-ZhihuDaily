<template>
    <div class="view view-comment">
        <div class="view-header">
            <div class="view-header-wrap">
                {{comments.total}}条点评
            </div>
        </div>
        <div class="view-content">
            <div class="view-comment-length">共{{comments.longComments}}条长评</div>
            <div class="view-comment-list">
                <div v-for="item in comments.list" class="view-comment-item">
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
                    </div>

                </div>
            </div>
        </div>
        <div class="view-bar">
            <div class="view-bar-wrap">
                <div class="view-bar-wrap-content">
                    <span class="icon icon-arrow-left" @click="goBack(id)"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'comments',
        data(){
            return {
                id: this.$route.params.id,
                getCommentsUrl(id){
                    return `${this.$uri}${this.$query.storyInfo(id, this.$query.longComments)}`
                },
                comments: {
                    total: this.$route.query.total || 0,
                    longComments: this.$route.query.long || 0,
                    list: []

                },

            }
        },
        beforeRouteEnter(currentRoute, prevRoute, next){
            next(vm => {
                console.log(vm.$route);
                let path = currentRoute.path.substr(1);
                vm.$http.get(`${vm.$uri}${path}`).then(res => {
                    vm.comments.list = res.body.comments;
                })
            })
        },
        methods: {
            goBack(id){
                this.$router.push(`/story/${this.id}`)
            }
        }
    }
</script>