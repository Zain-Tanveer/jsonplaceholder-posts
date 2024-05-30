<template>
  <div id="app">
    <the-header />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
.container {
  max-width: 75rem;
  width: calc(100% - 1rem);
  margin: 0 auto;
}

.card {
  margin: 0 auto;
  padding: 1rem;
  text-align: start;
  background-color: #fff;
}

.card-title {
  font-weight: bold;
}

.form {
  gap: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

[v-cloak] {
  display: none;
}
</style>
