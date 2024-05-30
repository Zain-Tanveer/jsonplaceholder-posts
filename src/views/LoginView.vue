<template>
  <div class="login">
    <h2>Welcome Back!</h2>
    <p>Please login to continue</p>
    <login-form />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login {
  text-align: center;
  margin-top: 3rem;
}

p {
  margin-bottom: 1rem;
}
</style>
