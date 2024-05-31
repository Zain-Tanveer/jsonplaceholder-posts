<template>
  <div class="posts">
    <div v-if="!allPosts.length && !postError" class="loading">Getting Posts...</div>

    <div v-if="!allPosts.length && postError" class="error">
      {{ postError }}
    </div>

    <div v-if="allPosts.length" class="content">
      <post-card v-for="post in allPosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { LocalStorageMixin } from "@/mixins/UtilityMixins.js";

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
    const posts = this.getItemFromLocalStorage("posts"); // gets all posts from local storage

    // if posts exist then set the posts state property to local storage posts
    // it commits a mutation which updates the 'posts' state property
    if (posts && posts.length) {
      this.SET_POSTS({ posts }); // committing a mutation
    } else {
      // fetches posts from the backend through api call
      // dispatches the fetchPosts() action in posts.js store module
      this.fetchPosts();
    }
  },

  data() {
    return {
      userPosts: [],
    };
  },

  computed: {
    ...mapGetters(["allPosts", "postError"]),
  },

  methods: {
    ...mapMutations(["SET_POSTS"]),
    ...mapActions(["fetchPosts"]),
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
