<template>
  <button class="btn">
    <slot>Submit</slot>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.btn {
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.6rem 0.8rem;
  border-radius: 0.325rem;
  border: none;
  background-color: #0d6efd;
  color: #fff;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0f66e9;
}

.btn[disabled] {
  cursor: initial;
  background-color: gray;
}
</style>
