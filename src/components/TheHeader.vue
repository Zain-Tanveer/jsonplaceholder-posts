<template>
  <header class="header">
    <div class="container">
      <h1>MyPosts</h1>
      <nav class="navbar" v-if="isLoginView">
        <router-link class="nav-link" :to="{ name: 'login' }" tag="div">Login</router-link>
        <router-link class="nav-link" :to="{ name: 'register' }" tag="div">Register</router-link>
      </nav>
      <template v-if="!isLoginView">
        <nav class="navbar">
          <router-link class="nav-link" :to="{ name: 'AllPosts' }" tag="div">Dashboard</router-link>
          <router-link class="nav-link" :to="{ name: 'CreatePost' }" tag="div">
            Create Post
          </router-link>
        </nav>
        <div class="user-settings">
          <div
            class="user-image"
            @click="showDropdown = !showDropdown"
            :data-expanded="showDropdown"
          >
            {{ user.username | initialsOnly }}
          </div>

          <div class="settings-dropdown" v-show="showDropdown">
            <div class="user-profile dropdown-option">
              <div class="dropdown-icon user-profile-image">
                {{ user.username | initialsOnly }}
              </div>
              <div class="username">
                {{ user.username }}
              </div>
            </div>
            <div class="dropdown-option">
              <div class="dropdown-icon">S</div>
              <div class="dropdown-text">Settings & Privacy</div>
            </div>
            <div class="dropdown-option">
              <div class="dropdown-icon">H</div>
              <div class="dropdown-text">Help & Support</div>
            </div>
            <div class="dropdown-option">
              <div class="dropdown-icon">A</div>
              <div class="dropdown-text">Accessability</div>
            </div>
            <div class="dropdown-option logout" @click="handleLogout">
              <div class="dropdown-icon">L</div>
              <div class="dropdown-text">Logout</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </header>
</template>

<script>
import { LocalStorageMixin } from "@/mixins/UtilityMixins.js";

export default {
  mixins: [LocalStorageMixin],

  filters: {
    /**
     * Filter to get only the initials of a property.
     *
     * {param} (String) - The property left of the filter pipe ' | '
     * {return} (String)
     */
    initialsOnly(value) {
      if (!value) return "";

      return value
        .trim()
        .split(" ")
        .map((val) => val.charAt(0).toUpperCase())
        .join(" ");
    },
  },

  data() {
    return {
      showDropdown: false,
    };
  },

  computed: {
    /**
     * Computed property to get info about the current page.
     * It is used to determine whether the current page is
     * public page (i.e., the page requires authentication or not)
     * and render the header nav links accordingly.
     *
     * {param} (none)
     * {return} (Boolean)
     */
    isLoginView() {
      // checks if the route has a 'requiresAuth' property in meta tag
      if (this.$route.matched.some((record) => record.meta.requiresAuth)) {
        return false;
      } else {
        return true;
      }
    },
    /**
     * Computed property to get info about the current logged in user.
     *
     *
     * {param} (none)
     * {return} (Object)
     */
    user() {
      // checks if the route has a 'requiresAuth' property in meta tag
      if (this.$route.matched.some((record) => record.meta.requiresAuth)) {
        const currentUser = this.getItemFromLocalStorage("user");
        return currentUser ? currentUser : {};
      } else {
        return {};
      }
    },
  },

  methods: {
    handleLogout() {
      this.showDropdown = false;
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar {
  display: flex;
}

.nav-link {
  cursor: pointer;
  padding: 1.25rem 1.25rem;
  margin-block: 0.25rem;
}

.nav-link:hover {
  background-color: #e0e0e0;
}

.nav-link.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}

.user-settings,
.user-image,
.dropdown-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-settings {
  position: relative;
  gap: 0.5rem;
  margin-right: 1rem;
}

.user-image,
.dropdown-icon {
  border-radius: 100vmax;
  background-color: #e0e0e0;
}

.user-image {
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in;
}

.user-image:hover {
  background-color: #cccccc;
}

.user-image[data-expanded="true"] {
  background-color: #cccccc;
}

.dropdown-icon {
  width: 2.5rem;
  height: 2.5rem;
}

.settings-dropdown {
  min-width: 240px;
  background-color: #fff;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 1.925rem;
  right: 1.5rem;
}

.settings-dropdown > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding-inline: 0.5rem;
  padding-block: 0.5rem;
  transition: background-color 0.15s ease-in;
}

.settings-dropdown > div:hover {
  background-color: #e0e0e0;
}

.user-profile {
  border-bottom: solid 1px #e0e0e0;
}
.logout {
  border-top: solid 1px #e0e0e0;
}
</style>
