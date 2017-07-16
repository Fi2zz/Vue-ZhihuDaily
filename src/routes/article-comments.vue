<template>
    <div class="view view-comment">
        <div class="view-header">
            <div class="view-header-wrap">
                {{comments.total}}条点评
            </div>
        </div>
        <div class="view-content">
            <div class="view-comment-length">共{{comments.long.length}}条长评</div>
            <div class="view-comment-list">
                <div v-for="item in comments.long" class="view-comment-item">
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

            <div class="view-comment-length">共{{comments.short.length}}条短评</div>
            <div class="view-comment-list">
                <div v-for="item in comments.short" class="view-comment-item">
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
                <div class="view-bar-wrap-content">
                    <span class="icon icon-arrow-left" @click="goBack(id)"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import mixins  from '../mixins'

    export default{

        name: 'comments',
        mixins: [mixins],
        data(){
            return {
                id: this.$route.params.id,


            }
        },
        computed: {
            comments(){
                return this.$store.state.comments
            }
        },
        beforeRouteEnter(currentRoute, prevRoute, next){
            next(vm => {
                let id = currentRoute.params.id;
                vm.id = id
                vm.commit('fetchComments', {id})
            })
        },
        created(){

        },
        methods: {
            goBack(id){
                this.$router.push(`/${this.id}`)
            },
            getDateFromeTime(time){
                let date = new Date(time * 1000);

                console.log(date)

                return `
                ${date.getFullYear()}-${this.padding(date.getMonth() + 1)}-${this.padding(date.getDate())}
                    ${this.padding(date.getHours())}:${this.padding(date.getMinutes())}
                `
            }
        }
    }
</script>