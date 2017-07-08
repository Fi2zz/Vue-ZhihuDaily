<template>
    <div class="swiper-slide">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'swiper-slide',
        mounted: function () {
            this.$nextTick(() => {
                this.update()
            })
        },
        updated: function () {
            this.$nextTick(() => {
                this.update()
            })
        },
        methods: {
            update: function () {
                if (this.$parent && this.$parent.swiper) {
                    this.$parent.swiper.update(true)
                    if (this.$parent.options.loop) {
                        this.$parent.swiper.destroyLoop()
                        this.$parent.swiper.createLoop()
                    }
                }
            }
        }
    }
</script>
