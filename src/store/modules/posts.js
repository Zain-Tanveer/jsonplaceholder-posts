import API from "@/services/API.js";
import { getItemFromLocalStorage, setItemInLocalStorage } from "@/utils/LocalStorage";

const state = {
  posts: [],
  fetching: false,
  error: null,
};

const getters = {
  /**
   * Getter to get all posts from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Array} All posts
   */
  allPosts: (state) => state.posts,

  /**
   * Getter to get fetching property from state.
   *
   * @param {Object} state - The current state object.
   * @returns {Boolean} Fetching state property
   */
  isFetching: (state) => state.fetching,

  /**
   * Getter to get error property from state.
   *
   * @param {Object} state - The current state object.
   * @returns {String | null} Error message
   */
  postError: (state) => state.error,
};

const actions = {
  /**
   * Action to fetch todos from backend. This action commits a
   * mutation to set the posts[] array in state.
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @returns {none}
   */
  async fetchPosts({ commit }) {
    try {
      commit("SET_ERROR", null); // sets the error state to null
      const response = await API.getAllPosts(); // fetches all posts from backend using api
      commit("SET_POSTS", { posts: response.data }); // sets the posts array with response
      setItemInLocalStorage("posts", response.data); // sets the fetched posts in local storage
    } catch (error) {
      commit("SET_ERROR", error.message);
    }
  },

  /**
   * Action to create a new post and update the posts[] array. This action commits a
   * mutation to add a new post the posts[] array in state.
   *
   * @param {Object} context - An object containing the same set of methods/properties available on the store instance
   * @returns {none}
   */
  async createPost({ commit, state }, payload) {
    try {
      commit("SET_ERROR", null); // sets the error state to null
      commit("SET_FETCHING", true); // sets the fetching state to true

      const response = await API.createPost(payload.post); // fetches all posts from backend using api
      response.data.id = getNewPostId(); // replace the returned '101' id

      commit("ADD_POST", { post: response.data }); // add the newly created post
      commit("SET_FETCHING", false); // sets the fetching state to false
      setItemInLocalStorage("posts", state.posts); // sets the newly updated posts[] array in local storage
    } catch (error) {
      commit("SET_FETCHING", false); // sets the fetching state to false
      commit("SET_ERROR", error.message);
    }
  },
};

const mutations = {
  /**
   * Mutation to set the data of posts[] array
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  SET_POSTS: (state, payload) => {
    state.posts = payload.posts;
  },

  /**
   * Mutation to set the data of posts[] array
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - An object containing additional data.
   * @returns {none}
   */
  ADD_POST: (state, payload) => {
    state.posts.unshift(payload.post);
  },

  /**
   * Mutation to set the fetching property
   *
   * @param {Object} state - The current state object.
   * @param {Boolean} value - Contains the fetching value
   * @returns {none}
   */
  SET_FETCHING: (state, value) => {
    state.fetching = value;
  },

  /**
   * Mutation to set the error property
   *
   * @param {Object} state - The current state object.
   * @param {String | null} error - Contains the error value
   * @returns {none}
   */
  SET_ERROR: (state, error) => {
    state.error = error;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

/**
 * Function to get a new post id.
 * Since the create post api does not actually add a post in database,
 * it will always return 101 as id which can create conflicts
 * in the key attribute in PostsComponent.vue's allPosts v-for.
 *
 * @param {none}
 * @returns {String}
 */
function getNewPostId() {
  const posts = getItemFromLocalStorage("posts"); // get all posts from local storage
  // if posts exist then get the first, check if its a user post i.e., the post id is 1000 or more,
  // convert it to a number otherwise return 1000 as the first user created post id
  if (posts && parseInt(posts[0].id) >= 1000) {
    const prevAddedPost = Number(posts[0].id); // gets the last added post id (user posts are added at the start of the array)
    return String(prevAddedPost + 1); // increments and returns it
  } else {
    return "1000";
  }
}
