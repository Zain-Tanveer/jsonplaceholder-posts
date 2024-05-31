<template>
  <div class="posts">
    <div v-if="!posts.length" class="loading">Getting Posts...</div>

    <div v-if="!posts.length && error" class="error">
      {{ error }}
    </div>

    <div v-if="userPosts.length" class="content">
      <post-card v-for="post in userPosts" :key="post.id" :post="post" />
    </div>

    <div v-if="posts.length" class="content">
      <post-card v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { LocalStorageMixin } from "@/mixins/UtilityMixins.js";
import API from "@/services/API.js";

export default {
  name: "posts-component",

  components: {
    PostCard: () => import("@/components/PostCard.vue"),
  },

  mixins: [LocalStorageMixin],

  /**
   * 'created' lifecycle hook used to check if there are saved posts in
   * local storage, and also used to fetch posts from backend.
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    const storagePosts = this.getItemFromLocalStorage("posts"); // gets all posts from local storage
    const storageUserPosts = this.getItemFromLocalStorage("userPosts"); // gets all user created posts from local storage

    // if posts exist then set the posts data property to local storage posts
    if (storagePosts && storagePosts.length) {
      this.posts = storagePosts;
    } else {
      // fetches posts from the backend through api call
      this.fetchPosts();
    }

    // if user posts exist then set the userPosts data property to local storage posts
    if (storageUserPosts && storageUserPosts.length) {
      this.userPosts = storageUserPosts;
    }
  },

  data() {
    return {
      error: null,
      posts: [],
      userPosts: [],
    };
  },

  methods: {
    /**
     * Function used to fetch posts from backend asynchronously
     *
     * @param {none}
     * @returns {void}
     */
    async fetchPosts() {
      try {
        this.error = null; // sets the error property to null
        const response = await API.getAllPosts(); // fetches all posts from backend using api
        this.posts = [...response.data]; // sets the posts data property to the data in response

        // updates the posts in local storage
        this.setItemInLocalStorage("posts", this.posts);
      } catch (error) {
        // if an error exists then set the error property to the error message
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.posts {
  margin-top: 2rem;
}

.loading {
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  width: 100%;
  margin-inline: auto;
  margin-bottom: 1rem;
}
</style>
