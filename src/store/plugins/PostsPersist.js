import VuexPersistence from "vuex-persist";

/**
 *
 *
 * @param {PersistOptions}
 */
export const postsLocal = new VuexPersistence({
  storage: window.localStorage,

  restoreState: (key, storage) => {
    const storedState = JSON.parse(storage.getItem(key));
    return { postsModule: { ...storedState } } || {};
  },

  reducer: (state) => ({
    posts: state.postsModule.posts,
  }),

  filter: (mutation) => ["SET_POSTS", "ADD_POST"].includes(mutation.type),
});
