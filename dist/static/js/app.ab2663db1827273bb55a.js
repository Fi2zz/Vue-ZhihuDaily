webpackJsonp([0],[,,function(t,e,i){"use strict";function n(t){var e=new Date,i=void 0,n=void 0,o=void 0;t||(i=e.getFullYear(),n=e.getMonth(),o=e.getDate()),i=Number(t.substring(0,4)),n=Number(t.substring(4,6)),o=Number(t.substring(6,8));var a=new Date(i,n-1,o),r=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];return a.getFullYear()+"年"+s(a.getMonth()+1)+"月"+s(a.getDate())+"日 "+r[a.getDay()]}i.d(e,"b",function(){return n}),i.d(e,"a",function(){return s});var s=function(t){return t>9?t:"0"+t}},function(t,e,i){"use strict";var n=i(2);e.a={data:function(){return{state:this.$store.state}},methods:{commit:function(t,e){var i={vm:this};for(var n in e)i[n]=e[n];this.$store.commit(t,i)},routing:function(t,e){var i={},n={};for(var s in e)if("params"===s)for(var o in e[s])i[o]=e[s][o];else if("query"===s)for(var a in e[s])n[a]=e[s][a];this.$router.push({path:t,params:i,query:n})},getDate:n.b}}},function(t,e){!function(t,e){function i(){var e=o.getBoundingClientRect().width;e/c>540&&(e=540*c);var i=e/10;o.style.fontSize=i+"px",u.rem=t.rem=i}var n,s=t.document,o=s.documentElement,a=s.querySelector('meta[name="viewport"]'),r=s.querySelector('meta[name="flexible"]'),c=0,l=0,u=e.flexible||(e.flexible={});if(a){console.warn("将根据已有的meta标签来设置缩放比例");var v=a.getAttribute("content").match(/initial\-scale=([\d\.]+)/);v&&(l=parseFloat(v[1]),c=parseInt(1/l))}else if(r){var m=r.getAttribute("content");if(m){var d=m.match(/initial\-dpr=([\d\.]+)/),f=m.match(/maximum\-dpr=([\d\.]+)/);d&&(c=parseFloat(d[1]),l=parseFloat((1/c).toFixed(2))),f&&(c=parseFloat(f[1]),l=parseFloat((1/c).toFixed(2)))}}if(!c&&!l){var p=(t.navigator.appVersion.match(/android/gi),t.navigator.appVersion.match(/iphone/gi)),h=t.devicePixelRatio;c=p?h>=3&&(!c||c>=3)?3:h>=2&&(!c||c>=2)?2:1:1,l=1/c}if(o.setAttribute("data-dpr",c),!a)if(a=s.createElement("meta"),a.setAttribute("name","viewport"),a.setAttribute("content","initial-scale="+l+", maximum-scale="+l+", minimum-scale="+l+", user-scalable=no"),o.firstElementChild)o.firstElementChild.appendChild(a);else{var w=s.createElement("div");w.appendChild(a),s.write(w.innerHTML)}t.addEventListener("resize",function(){clearTimeout(n),n=setTimeout(i,300)},!1),t.addEventListener("pageshow",function(t){t.persisted&&(clearTimeout(n),n=setTimeout(i,300))},!1),"complete"===s.readyState?s.body.style.fontSize=12*c+"px":s.addEventListener("DOMContentLoaded",function(){s.body.style.fontSize=12*c+"px"},!1),i(),u.dpr=t.dpr=c,u.refreshRem=i,u.rem2px=function(t){var e=parseFloat(t)*this.rem;return"string"==typeof t&&t.match(/rem$/)&&(e+="px"),e},u.px2rem=function(t){var e=parseFloat(t)/this.rem;return"string"==typeof t&&t.match(/px$/)&&(e+="rem"),e}}(window,window.lib||(window.lib={}))},function(t,e,i){"use strict";var n=i(1),s=i(26),o=i(21),a=i.n(o),r=i(20),c=i.n(r),l=i(19),u=i.n(l);n.a.use(s.a),e.a=new s.a({routes:[{path:"/",name:"index",component:a.a},{path:"/story/:id",name:"article",component:c.a},{path:"/story/:id/comments",name:"comments",component:u.a}]})},function(t,e,i){"use strict";var n=i(1),s=i(28),o=i(2);n.a.use(s.a);var a={uri:window.location.protocol+"//"+window.location.hostname+":8000",list:"/",before:"/before",story:"/story/",storyInfo:"/story-extra/"},r=new Date,c=""+r.getFullYear()+i.i(o.a)(r.getMonth()+1)+i.i(o.a)(r.getDate());e.a=new s.a.Store({state:{hot:[],stories:[],tops:[],currentDate:c,currentIndex:0,currentId:null,date:[],isFetched:!1,ready:!1,story:{id:"",content:"",info:{likes:0,popularity:0,comments:0}},comments:{long:[],short:[],total:0}},mutations:{routing:function(t,e){},fetchStory:function(t,e){var i=e.vm,n=e.id,s=""+a.uri+a.story+n;i.$http.get(s).then(function(t){console.log(t)})},fetchStoryInfo:function(t,e){var i=t.story.id,n=""+a.uri+a.storyInfo+i;vm.$http.get(n).then(function(t){console.log(t)})},fetchComment:function(t,e){},fetchData:function(t,e){var i=e.vm,n=""+a.uri+a.list;i.$http.get(n).then(function(e){var n=e.body||e.data;t.tops=n.top_stories,t.stories.push({date:n.date,list:n.stories}),i.$store.commit("fetchLastDate",{date:Number(n.date),vm:i})})},fetchLastDate:function(t,e){var i=e.vm,n=e.date,s=t.stories,o=""+a.uri+a.before+"/"+n;i.$http.get(o).then(function(e){var i=e.body;s.push({date:i.date,list:i.stories}),t.currentDate=i.date})}}})},function(t,e,i){function n(t){i(16)}var s=i(0)(i(9),i(23),n,null,null);t.exports=s.exports},,function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"comments",data:function(){return{id:this.$route.params.id,getCommentsUrl:function(t){return""+this.$uri+this.$query.storyInfo(t,this.$query.longComments)},comments:{total:this.$route.query.total||0,longComments:this.$route.query.long||0,list:[]}}},beforeRouteEnter:function(t,e,i){i(function(e){console.log(e.$route);var i=t.path.substr(1);e.$http.get(""+e.$uri+i).then(function(t){e.comments.list=t.body.comments})})},methods:{goBack:function(t){this.$router.push("/story/"+this.id)}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(3);e.default={name:"story",mixins:[n.a],data:function(){return{content:"",url:""+this.$uri+this.$query.article+"/",id:this.$route.params.id,title:"",imageSource:"",storyExtra:""+this.$uri+this.$query.storyExtra+this.$route.params.id,storyInfo:{},cached:!1,nextId:this.$route.query.next}},watch:{content:{deep:!0,handler:function(t){var e=this;t&&this.$nextTick(function(){var i=e.$refs.content.querySelector(".headline .img-place-holder"),n=new Image;n.src=t.image,n.addEventListener("load",function(){i.classList.add("img-wrap"),i.classList.remove("img-place-holder"),i.style.height="250px",i.style.overflow="hidden",i.style.position="relative",i.innerHTML='\n                                        <h1 class="headline-title">'+e.title+'</h1>\n                                        <img src="'+t.image+'" class="article-cover">\n                                        <span class="img-source">'+e.imageSource+' </span>\n                                        <div class="img-mask"></div>\n\n                                '})})}}},beforeRouteEnter:function(t,e,i){i(function(t){t.commit("fetchStory",{id:t.id})})},created:function(){var t=this;this.$http.get(this.url+this.id).then(function(e){var i=e.body;t.content=e.body,t.title=i.title,t.imageSource=i.image_source}),this.fetchExtraInfo(!1),console.log(this.$route)},methods:{fetchExtraInfo:function(t){var e=this;t?clearTimeout(this.timer):(this.$http.get(this.storyExtra).then(function(t){e.storyInfo=t.body}),this.timer=setTimeout(function(){e.fetchExtraInfo()},6e4))},viewNext:function(t){},viewComment:function(t){var e=this.storyInfo;this.$router.push({path:"/story/"+t+"/comments",query:{total:e.comments,long:e.long_comments}})}},beforeRouteLeave:function(t,e,i){this.fetchExtraInfo(!0),i()}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(18),s=i.n(n),o=i(15),a=(i.n(o),i(3)),r=i(2),c=(i(13),new Date),l=(c.getFullYear(),i.i(r.a)(c.getMonth()+1),i.i(r.a)(c.getDate()),c.getDay()),u=""+c.getFullYear()+i.i(r.a)(c.getMonth()+1)+i.i(r.a)(c.getDate()-l);console.log(u),e.default={name:"index",mixins:[a.a],data:function(){return{swipeOpts:{autoplay:0,pagination:".swiper-pagination",paginationClickable:!0,observer:!0,lazyload:!0},lazyLoading:"http://static.daily.zhihu.com/img/new_home_v3/mobile_top_logo.png",viewStories:this.$store.state.stories,viewTitleActivated:!1,viewTitle:"今日热闻",sectionTitleList:[],currentList:{},scrollPosition:0,breakPoint:!1,scrollDown:!1,sections:[]}},watch:{currentList:{deep:!0,handler:function(t){console.log(t)}},sections:function(t){console.log(t)},currentViewDate:function(t){this.sections.push(t),setTimeout(function(){Number(t)},2e3)},sectionTitleList:function(t){}},computed:{hot:function(){var t=this.state.tops;return t||[]},currentViewDate:function(){return this.state.currentDate}},mounted:function(){var t=this;this.$nextTick(function(){new s.a(".swiper-container",t.swipeOpts)}),window.addEventListener("scroll",this.getScrollState,!1)},beforeRouteEnter:function(t,e,i){i(function(t){t.commit("fetchData")})},methods:{getScrollState:function(){var t=this,e=window.scrollY;this.viewTitleActivated=e>=44;this.$nextTick(function(){var n=t.$refs.viewList;if(n)for(var s=n.querySelectorAll(".view-list-title"),o=0;o<s.length;o++){var a=s[o],c=a.getBoundingClientRect(),l=(c.top,a.parentNode.getBoundingClientRect());l.bottom===window.screen.height&&t.commit("fetchLastDate",{date:t.currentViewDate}),t.viewTitle=e>=44?i.i(r.b)(t.currentViewDate):"今日热闻",t.scrollDown=e>t.scrollPosition,t.scrollPosition=e}})},getArticle:function(t,e){this.routing("/story/"+t,{params:{mmm:"111"},query:{index:e}})},setCoverStyle:function(t){return{background:"url("+t+")",backgroundPosition:"center center",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}}}},function(t,e,i){"use strict"},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(1),s=i(7),o=i.n(s),a=i(8),r=i(6),c=i(5);i(4),n.a.use(a.a),n.a.prototype.$uri=window.location.protocol+"//"+window.location.hostname+":8000/",n.a.prototype.$query={cover:"prefetch-image",list:"latest",article:"story",storyExtra:"story-extra/",longComments:"long-comments",shortComments:"short-comments",themes:"theme",older:"/before",storyInfo:function(t,e){return"story/"+t+"/"+e}},n.a.prototype.$padding=function(t){return t>9?t:"0"+t},window.vm=new n.a({el:"#app",router:c.a,store:r.a,render:function(t){return t(o.a)}})},function(t,e){},function(t,e){},function(t,e){},,function(t,e,i){var n=i(0)(i(10),i(24),null,null,null);t.exports=n.exports},function(t,e,i){var n=i(0)(i(11),i(22),null,null,null);t.exports=n.exports},function(t,e,i){function n(t){i(17)}var s=i(0)(i(12),i(25),n,null,null);t.exports=s.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view view-article"},[i("div",{ref:"content",staticClass:"app-article-main",domProps:{innerHTML:t._s(t.content.body)}}),t._v(" "),i("div",{staticClass:"view-bar"},[i("div",{staticClass:"view-bar-wrap"},[i("div",{staticClass:"view-bar-item view-prev",on:{click:function(e){t.$router.push({path:"/"})}}},[i("span",{staticClass:"icon icon-arrow-left"})]),t._v(" "),t._m(0),t._v(" "),i("div",{staticClass:"view-bar-item view-like"},[i("span",{staticClass:"icon icon-like"}),t._v(" "),i("span",{staticClass:"text"},[t._v(t._s(t.storyInfo.popularity))])]),t._v(" "),t._m(1),t._v(" "),i("div",{staticClass:"view-bar-item view-comments",on:{click:function(e){t.viewComment(t.id)}}},[i("span",{staticClass:"icon icon-comment"}),t._v(" "),i("span",{staticClass:"text"},[t._v(t._s(t.storyInfo.long_comments))])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view-bar-item view-next"},[i("span",{staticClass:"icon icon-arrow-down"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view-bar-item view-share"},[i("span",{staticClass:"icon icon-share"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view view-comment"},[i("div",{staticClass:"view-header"},[i("div",{staticClass:"view-header-wrap"},[t._v("\n            "+t._s(t.comments.total)+"条点评\n        ")])]),t._v(" "),i("div",{staticClass:"view-content"},[i("div",{staticClass:"view-comment-length"},[t._v("共"+t._s(t.comments.longComments)+"条长评")]),t._v(" "),i("div",{staticClass:"view-comment-list"},t._l(t.comments.list,function(e){return i("div",{staticClass:"view-comment-item"},[i("div",{staticClass:"view-comment-item-bio"},[i("div",{staticClass:"avatar"},[i("img",{attrs:{src:e.avatar,alt:""}})]),t._v(" "),i("span",{staticClass:"bio-name"},[t._v(t._s(e.author))]),t._v(" "),i("span",{staticClass:"like"},[i("span",{staticClass:"icon icon-like"}),t._v("\n                        "+t._s(e.likes)+"\n                    ")])]),t._v(" "),i("div",{staticClass:"view-comment-item-content"},[t._v("\n                    "+t._s(e.content)+"\n                ")])])}))]),t._v(" "),i("div",{staticClass:"view-bar"},[i("div",{staticClass:"view-bar-wrap"},[i("div",{staticClass:"view-bar-wrap-content"},[i("span",{staticClass:"icon icon-arrow-left",on:{click:function(e){t.goBack(t.id)}}})])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view list-view"},[i("div",{staticClass:"view-title"},[i("div",{staticClass:"view-title-wrap",class:{"view-title-wrap-active":t.viewTitleActivated}},[t._v("\n      "+t._s(t.viewTitle)+"\n    ")])]),t._v(" "),i("div",{staticClass:"view-swiper",staticStyle:{position:"relative","z-index":"7"}},[i("div",{staticClass:"swiper-container app-list-swiper"},[i("div",{staticClass:"swiper-wrapper"},t._l(t.hot,function(e){return i("div",{key:e.id,staticClass:"swiper-lazy swiper-slide",style:t.setCoverStyle(e.image),on:{click:function(i){t.getArticle(e.id)}}})})),t._v(" "),i("div",{staticClass:"swiper-pagination"})])]),t._v(" "),i("div",{ref:"viewList",staticClass:"view-list"},t._l(t.viewStories,function(e,n){return i("div",{staticClass:"view-list-container"},[0!==n?i("div",{staticClass:"view-list-title"},[i("div",{staticClass:"view-list-title-wrap"},[t._v(t._s(t.getDate(e.date)))])]):t._e(),t._v(" "),i("ol",{staticClass:"view-list-list"},t._l(e.list,function(e){return i("li",{staticClass:"view-list-item",on:{click:function(i){t.getArticle(e.id,n)}}},[i("h3",{staticClass:"view-list-item-title"},[t._v("\n            "+t._s(e.title)+"\n          ")]),t._v(" "),i("div",{staticClass:"view-list-item-image"},[i("div",{staticClass:"view-list-item-cover",style:t.setCoverStyle(e.images[0])})])])}))])}))])},staticRenderFns:[]}},,,,,function(t,e){}],[14]);
//# sourceMappingURL=app.ab2663db1827273bb55a.js.map