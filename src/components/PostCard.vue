<template>
  <div class="card">
    <p class="card-title">{{ post.title }}</p>
    <p class="card-body">{{ post.body }}</p>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
