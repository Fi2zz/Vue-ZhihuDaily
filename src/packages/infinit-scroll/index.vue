<template>
    <div class="infinite-scroll">
        <div class="loader" v-show="loading">
        </div>
        <span v-show="loading" class="infinite-scroll-text">{{loadingText}}</span>
    </div>
</template>
<script>

    export default {
        name: "infinite-scroll",
        props: {
            el: {
                type: [HTMLDocument, Element, Window],
                default () {
                    return window
                }
            },
            loading: Boolean,
            loadingText: {
                type: String,
                default: '正在加载...'
            }
        },
        mounted() {
            this.bind()
        },
        methods: {
            bind() {
                if (!this.el) return;
                this._handleScroll = (e) => {
                    if (this.onScroll) this.onScroll() //滑动屏幕回调函数
                };
                this.el.addEventListener('scroll', this._handleScroll)
            },
            unbind(el) {
                let scroller = el || this.el
                if (this._handleScroll) scroller.removeEventListener('scroll', this._handleScroll)
            },
            onScroll() {
                if (this.loading) return;
                const doc = document, docEl = doc.documentElement, body = document.body;
                const el = this.el;
                const isWindow = el === window;
                const scrollTop = isWindow ? el.scrollY : el.scrollTop;
                const scrollHeight = isWindow ? docEl.scrollHeight || (body.scrollHeight) : el.scrollHeight;
                let h = scrollHeight - scrollTop - 5;
                let sh = isWindow ? window.innerHeight : el.offsetHeight
                //滑动距离大于内容高度触发加载事件
                if (h <= sh) {
                    this.$emit('load')
                }
            }
        },
        beforeDestroy() {
            this.unbind()
        },
        watch: {
            el(neo, old) {
                if (neo !== old) {
                    this.unbind(old);
                    this.bind(neo)
                }
            }
        }
    }

</script>


