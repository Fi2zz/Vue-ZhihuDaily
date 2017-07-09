<template>
    <div class="view view-article">
        <div class="app-article-main" ref="content" v-html="content.body"></div>


        <div class="view-bar">
            <div class="view-bar-wrap">
                <div class="view-bar-item view-prev"><span class="icon icon-arrow-left"></span></div>
                <div class="view-bar-item view-next"><span class="icon icon-arrow-down"></span></div>
                <div class="view-bar-item view-like"><span class="icon icon-like"></span>
                    <span class="text">{{storyInfo.popularity}}</span>
                </div>
                <div class="view-bar-item view-share"><span class="icon icon-share"></span></div>
                <div class="view-bar-item view-comments" @click="viewComment(id)"><span
                        class="icon icon-comment"></span>
                    <span class="text">{{storyInfo.long_comments}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'story',
        data(){
            return {
                content: '',
                url: `${this.$uri}${this.$query.article}/`,
                id: this.$route.params.id,
                title: '',
                imageSource: '',
                storyExtra: `${this.$uri}${this.$query.storyExtra}${this.$route.params.id}`,
                storyInfo: {},
                cached: false
            }
        },
        watch: {
            content: {
                deep: true,
                handler(content){
                    if (content) {
                        this.$nextTick(() => {
                            let cover = this.$refs['content'].querySelector('.headline .img-place-holder');
                            let image = new Image();
                            image.src = content.image;
                            image.addEventListener('load', () => {
                                cover.classList.add('img-wrap');
                                cover.classList.remove('img-place-holder')
                                cover.style.height = '300px';
                                cover.style.overflow = 'hidden';
                                cover.style.position = 'relative';
                                cover.style.webkitTransition = 'all linear 2000ms'
                                cover.innerHTML = `
                                        <h1 class="headline-title">${this.title}</h1>
                                        <img src="${content.image}" class="article-cover">
                                        <span class="img-source">${this.imageSource} </span>
                                        <div class="img-mask"></div>

                                `;
                            })
                        })
                    }
                }
            }
        },
        created(){
            this.$http.get(this.url + this.id).then(res => {
                let data = res.body;
                this.content = res.body;
                this.title = data.title;
                this.imageSource = data.image_source;

            });
            this.fetchExtraInfo(false);
        },
        methods: {

            fetchExtraInfo(clear){
                if (!clear) {
                    this.$http.get(this.storyExtra).then(res => {
                        this.storyInfo = res.body;
                    });
                    //每一分钟查询一次最新的文章额外信息
                    this.timer = setTimeout(() => {
                        this.fetchExtraInfo()
                    }, 1000 * 60);

                }
                else {
                    clearTimeout(this.timer)
                }
            },
            viewComment(id){
                let info = this.storyInfo;
                this.$router.push({
                    path: `/story/${id}/comments`,
                    query: {total: info.comments, long: info.long_comments}
                })
            }
        },
        beforeRouteLeave(to,from,next){
            this.fetchExtraInfo(true)
            next()
        }
    }
</script>