<template>
  <form class="form card" @submit.prevent="handleLogin">
    <base-input
      :focus="true"
      v-model="username.value"
      :error="username.error"
      label="Username*"
      type="text"
      id="username"
      name="username"
      placeholder="Enter your username"
    />

    <base-input
      v-model="password.value"
      :error="password.error"
      label="Password*"
      type="password"
      id="password"
      name="password"
      placeholder="Enter your password"
    />

    <base-input class="checkbox">
      <template #label-left> </template>
      <template #input-field>
        <input type="checkbox" name="remember" id="remember" />
      </template>
      <template #label-right>
        <label for="remember">Remember Me</label>
      </template>
    </base-input>

    <base-button type="submit"> Login </base-button>
  </form>
</template>

<script>
import { LocalStorageMixin } from "@/mixins/UtilityMixins.js";

import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";

export default {
  components: {
    BaseInput,
    BaseButton,
  },

  mixins: [LocalStorageMixin],

  data() {
    return {
      username: {
        value: null,
        error: null,
      },
      password: {
        value: null,
        error: null,
      },
    };
  },

  methods: {
    /**
     * Function to handle login form submission.
     *
     * @param {none}
     * @returns {void}
     */
    handleLogin() {
      this.username.error = null;
      this.password.error = null;

      // simple validation for empty values
      if (!this.username.value) {
        this.username.error = "Username is required";
      }
      if (!this.password.value) {
        this.password.error = "Password is required";
      }

      if (!this.username.value || !this.password.value) {
        return;
      }

      // new login user
      const user = {
        username: this.username.value,
      };

      this.setItemInLocalStorage("user", user); // sets the user property in local storage
      this.setItemInLocalStorage("isLoggedIn", true); // sets the isLoggedIn property in local storage

      // if the user accesses any route that has 'requiresAuth' in meta without being logged in,
      // they will be redirected back to login page. This will make it so when the user is trying to
      // access say /dashboard/create for create post and is redirected to login, then
      // when the user logs in again then they will be redirected to /dashboard/create
      // instead of /dashboard.
      const redirectPath = this.$route.query.redirect || "/dashboard";
      this.$router.push(redirectPath);
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 480px;
  padding: 1.5rem;
}
</style>
