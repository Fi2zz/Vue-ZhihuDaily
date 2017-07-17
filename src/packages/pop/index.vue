<template>
  <transition :name="currentTransition">
    <div v-show="visible" class="popup" :class="setupPopupPosition">
      <slot></slot>
    </div>
  </transition>
</template>

<style lang="stylus">

  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background: #000;
  }

  .v-modal-enter {
    animation: v-modal-in .2s ease;
  }

  .v-modal-leave {
    animation: v-modal-out .2s ease forwards;
  }

  @keyframes v-modal-in {
    0% {
      opacity: 0;
    }
    100% {
    }
  }

  @keyframes v-modal-out {
    0% {
    }
    100% {
      opacity: 0;
    }
  }

  .popup {
    position: fixed;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    backface-visibility: hidden;
    transition: .2s ease-out;

    &-top {
      top: 0;
      right: auto;
      bottom: auto;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }

    &right {
      top: 50%;
      right: 0;
      bottom: auto;
      left: auto;
      transform: translate3d(0, -50%, 0);
    }

    &-bottom {
      top: auto;
      right: auto;
      bottom: 0;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }

    &-left {
      top: 50%;
      right: auto;
      bottom: auto;
      left: 0;
      transform: translate3d(0, -50%, 0);
    }
  }

  .popup-slide-top-enter,
  .popup-slide-top-leave-active {
    transform: translate3d(-50%, -100%, 0);
  }

  .popup-slide-right-enter,
  .popup-slide-right-leave-active {
    transform: translate3d(100%, -50%, 0);
  }

  .popup-slide-bottom-enter,
  .popup-slide-bottom-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }

  .popup-slide-left-enter,
  .popup-slide-left-leave-active {
    transform: translate3d(-100%, -50%, 0);
  }

  .popup-fade-enter,
  .popup-fade-leave-active {
    opacity: 0;
  }
</style>

<script type="text/babel">
  import PopupManager from './popup-manager';
  function merge(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
      let source = arguments[i];
      for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
          let value = source[prop];
          if (value !== undefined) {
            target[prop] = value;
          }
        }
      }
    }

    return target;
  }

  let idSeed = 1;
  const getDOM = function (dom) {
    if (dom.nodeType === 3) {
      dom = dom.nextElementSibling || dom.nextSibling;
      getDOM(dom);
    }
    return dom;
  };


  export default {
    name: 'popup',
    props: {
      value: Boolean,
      transition: {
        type: String,
        default: 'popup-slide'
      },
      position: String,
      zIndex: [Number, String],
      modal: {
        type: Boolean,
        default: true
      },
      modalClass: String,
      closeOnClickModal: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      setupPopupPosition(){
        return this.position ? `popup-${this.position}` : ''
      }
    },
    data() {
      return {
        currentTransition: this.transition,
        lockScroll: true,
        visible: false
      };
    },
    beforeMount() {
      if (this.transition !== 'popup-fade') {
        this.currentTransition = `popup-slide-${ this.position }`;
      }
    },
    mounted(){
      this._popupId = `popup-${idSeed++}`;
      PopupManager.register(this._popupId, this);
    },
    beforeDestroy() {
      PopupManager.deregister(this._popupId);
      PopupManager.closeModal(this._popupId);
    },
    watch: {
      visible(visible) {
        visible ? this.open() : this.close();
        this.$emit('input', visible)

      },
      value(val) {
        this.visible = val;
      }
    },
    methods: {
      open() {
        const props = this;
        if (this.willOpen && !this.willOpen()) return;
        const dom = getDOM(this.$el);
        const modal = props.modal;
        const zIndex = props.zIndex;
        if (zIndex) {
          PopupManager.zIndex = zIndex;
        }
        if (modal) {
          PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), dom, props.modalClass);
        }
        if (getComputedStyle(dom).position === 'static') {
          dom.style.position = 'absolute';
        }
        if (modal) {
          dom.style.zIndex = PopupManager.nextZIndex();
        } else if (zIndex) {
          dom.style.zIndex = zIndex;
        }
      },
      close() {
        this.visible = false;
        this.onClose && this.onClose();
        PopupManager.closeModal(this._popupId);
      }

    }
  };

</script>
