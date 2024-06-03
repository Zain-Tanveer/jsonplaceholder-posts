import Vue from "vue";
import Vuex from "vuex";

import postsModule from "./modules/posts";
import { postsLocal } from "./plugins/PostsPersist.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  modules: {
    postsModule,
  },

  plugins: [postsLocal.plugin],
});
