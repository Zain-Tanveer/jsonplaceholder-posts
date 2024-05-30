<template>
  <main>
    <div class="container">
      <h2>Dashboard {{ currentPage }}</h2>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</template>

<script>
export default {
  name: "dashboard-view",

  computed: {
    /**
     * Computed property to get info about the current page.
     * It checks to see the current name of the route and displays info accordingly.
     * It is display next to 'Dashboard' in template.
     *
     * {param} (none)
     * {return} (String)
     */
    currentPage() {
      return this.$route.name === "AllPosts"
        ? "> All Posts"
        : this.$route.name === "CreatePost"
        ? "> Create Post"
        : "";
    },
  },
};
</script>

<style scoped>
.container {
  margin-block: 2rem;
}
</style>
