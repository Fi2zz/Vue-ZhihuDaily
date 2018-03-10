require("./flexible");

import Vue from "vue";
import App from "./main.vue";
import VueResource from "vue-resource";
import store from "./vuex/store";
import router from "./routes/index";
Vue.use(VueResource);

Vue.prototype.$addEvent = function(el, event, handler, userCapture = false) {
  el.addEventListener(event, handler, userCapture);
};
Vue.prototype.$removeEvent = function(el, event, handler, userCapture = false) {
  el.removeEventListener(event, handler, userCapture);
};
window.vm = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
