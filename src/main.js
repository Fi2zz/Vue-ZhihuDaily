import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
Vue.prototype.$addEvent = function (el, event, handler, userCapture = false) {
    setTimeout(() => {
        el.addEventListener(event, handler, userCapture);
    }, 0);
};
Vue.prototype.$removeEvent = function (el, event, handler, userCapture = false) {
    setTimeout(() => {
        el.removeEventListener(event, handler, userCapture);
    }, 0);
};

Vue.prototype.padding = function (number) {
    return parseInt(number) > 9 ? `${number}` : `0${number}`;
};
const app = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});
