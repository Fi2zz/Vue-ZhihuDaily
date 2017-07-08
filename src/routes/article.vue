<template>
    <div class="view">
        <div class="app-article-main" ref="content" v-html="content.body"></div>
    </div>
</template>
<script>
    export default{
        name: 'article',
        data(){
            return {
                content: '',
                url: `${this.$uri}${this.$query.article}/`,
                id: this.$route.params.id,
                title:'',
                imageSource:'',
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
            let id = this.$route.params.id;
            this.$http.get(this.url + id).then(res => {

                let data = res.body;


                let css = data.css;

                //使用知乎日报官方样式表
                for (let i of css) {
                    let style = document.createElement('link');
                    let head = document.head;
                    head.appendChild(style)
                    style.type = 'text/css';
                    style.rel = 'stylesheet';
                    style.href = i
                }
                this.content = res.body
                this.title=data.title
                this.imageSource =data.image_source


            })
        }
    }
</script>