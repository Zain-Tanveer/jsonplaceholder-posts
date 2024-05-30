<template>
  <div class="not-found">
    <h1>Not Found</h1>
    <p>
      Oops we couldn't find that page. Try going to
      <router-link :to="{ name: 'login' }">home</router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.not-found {
  margin-top: 30vh;
  text-align: center;
}
</style>
