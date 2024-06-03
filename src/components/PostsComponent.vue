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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "posts-component",

  components: {
    PostCard: () => import("@/components/PostCard.vue"),
  },

  /**
   * 'created' lifecycle hook used to check if there are saved posts in
   * local storage, if not then call the fetchPosts() action.
   *
   * @param {none}
   * @returns {void}
   */
  created() {
    // if posts don't exist then call the fetchPosts() action from posts vuex module.
    // it commits a mutation which updates the 'posts' state property
    if (!this.allPosts || !this.allPosts.length) {
      this.fetchPosts();
    }
  },

  computed: {
    ...mapGetters(["allPosts", "postError"]),
    // ...mapGetters("postsModule", ["allPosts", "postError"]),
  },

  methods: {
    ...mapActions(["fetchPosts"]),
    // ...mapActions("postsModule", ["fetchPosts"]),
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
