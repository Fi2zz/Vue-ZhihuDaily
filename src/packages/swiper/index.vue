<template>
  <div class="swiper-container" ref="swiperElement">
    <slot name="parallax-bg"></slot>
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <slot name="pagination"></slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>
  </div>
</template>
<script>


  //    require('./swiper.styl');

  import './swiper.styl'
  import Swiper from 'swiper'

  export default {
    name: 'swiper',
    props: {
      options: {
        type: Object,
        default: function () {
          return {
            autoplay: 1000
          }
        }
      },
    },
    mounted () {
      const mount = () => {
        if (!this.swiper) {
          self.swiper = new Swiper(this.$el, this.options);
        }
      };
      this.$nextTick(function () {
        mount()
      });

    },
    updated () {
      if (typeof this.swiper !== "undefined") {
        this.swiper.update()
      }

    },
    beforeDestroy () {
      if (!!this.swiper) {
        this.$nextTick(function () {
          this.swiper.destroy()
        });
        delete this.swiper
      }
    }
  }

</script>
