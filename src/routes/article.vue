<template>
  <div class="view view-article">
    <div class="app-article-main" ref="content" v-html="story.content"></div>

    <div class="view-bar">
      <div class="view-bar-wrap">
        <div class="view-bar-item view-prev" @click="$router.push({path:'/'})"><span
          class="icon icon-arrow-left"></span></div>
        <div class="view-bar-item view-next"
             @click="viewNext(nextId)"><span class="icon icon-arrow-down"></span></div>
        <div class="view-bar-item view-like"><span class="icon icon-like"></span>
          <span class="text">{{story.likes}}</span>
        </div>
        <div class="view-bar-item view-share" @click="showPopup(true)"><span class="icon icon-share"></span></div>
        <div class="view-bar-item view-comments" @click="viewComment(story.id)"><span
          class="icon icon-comment"></span>
          <span class="text">{{story.comments.total}}</span>
        </div>
      </div>
    </div>

    <share v-model="popVisible">\
    </share>
  </div>
</template>


<script>


  import mixins  from '../mixins'
  import share from '../packages/share/index.vue'
  export default{
    name: 'story',
    mixins: [mixins],
    components: {
      share
    },
    data(){
      return {
        id: this.$route.params.id,
        nextId: this.$route.query.nextId,
        stateStory: this.$store.state,
        popVisible: false
      }
    },
    computed: {
      story(){
        let story = this.stateStory.story;
        if (story.cover) {
          this.$nextTick(() => {
            let cover = this.$refs['content'].querySelector('.headline .img-place-holder');
            let image = new Image();
            image.src = story.cover;
            image.addEventListener('load', () => {
              cover.classList.add('img-wrap');
              cover.classList.remove('img-place-holder')
              cover.style.height = '250px';
              cover.style.overflow = 'hidden';
              cover.style.position = 'relative';
              cover.innerHTML = `
                                        <h1 class="headline-title">${story.title}</h1>
                                        <img src="${image.src}" class="article-cover">
                                        <span class="img-source">${story.imageSource} </span>
                                        <div class="img-mask"></div>

                                `;
            })
          });
        }

        return story
      }
    },
    beforeRouteEnter(from, to, next){
      next(vm => {
        let id = from.params.id;
        vm.commit('fetchStory', {id: id})
//                vm.fetchInfo(vm)

      })
    },
    beforeRouteLeave(to, from, next){
      this.fetchInfo(this, true);
      this.story = null;
      next();
    },
    watch: {
      popVisible(visible){
        console.log(visible)
      }
    },
    mounted(){
      this.popVisible = true
    },
    methods: {
      showPopup(show){

        this.popVisible = show

      },
      fetchInfo(vm, clear){
        vm.commit('fetchStoryInfo', {id: vm.id})
        if (!clear) {
          vm.timer = setTimeout(() => {
            vm.fetchInfo(vm, false)
          }, 1000 * 60)
        }
        else {
          clearTimeout(vm.timer)
        }
      },
      viewNext(next){
        this.$router.push({path: `/${next}`})
      },
      viewComment(id){
        this.$router.push({
          path: `/${id}/comments`
        })
      }
    },
  }
</script>
