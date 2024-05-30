import Vue from "vue";

import "@/assets/css/style.css";

import App from "./App.vue";
import router from "./router";

/**
 * This is a global custom directive that when applied to an input element will auto focus it
 * whenever that element is mounted to the DOM.
 *
 * {param} (String) - name of the custom directive
 * {param} (any) - options provided i.e., custom directive hooks
 * {return} (void)
 */
Vue.directive("focus", {
  inserted: function (el) {
    el.focus();
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
