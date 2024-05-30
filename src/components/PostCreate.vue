<template>
  <div>
    <!-- <div class="response-message">Post created!</div> -->
    <div class="create-post card">
      <h3 class="card-title">Create a Post</h3>
      <div class="card-body">
        <form class="form" @submit.prevent="handleCreate">
          <base-input
            v-model="title.value"
            :error="title.error"
            label="Title*"
            type="text"
            id="title"
            name="title"
            placeholder="Enter a title"
            :focus="true"
          />

          <base-input :error="body.error" label="Body*" id="body">
            <template #input-field>
              <textarea
                v-model="body.value"
                id="body"
                name="body"
                class="input"
                rows="10"
                placeholder="Enter some description"
              ></textarea>
            </template>
          </base-input>

          <base-button type="submit" :disabled="fetching">
            {{ buttonText }}
          </base-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { LocalStorageMixin } from "@/mixins/UtilityMixins.js";
import API from "@/services/API.js";

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
      title: {
        value: null,
        error: null,
      },
      body: {
        value: null,
        error: null,
      },
      fetching: false,
      newPostId: null,
    };
  },

  computed: {
    /**
     * Computed property to set the text of button. If data is being fetched
     * then set the text to 'Creating...' otherwise set it to 'Create'.
     * Used to show user that they have made a create request.
     *
     * {param} (none)
     * {return} (String)
     */
    buttonText() {
      return this.fetching ? "Creating..." : "Create";
    },
  },

  methods: {
    /**
     * Function to get a new post id.
     * Since the create post api does not actually add a post in database,
     * it will always return 101 as id which can create conflicts
     * in the key attribute in PostsComponent.vue's userPosts v-for.
     *
     * {param} (none)
     * {return} (String)
     */
    getNewPostId() {
      const storagePosts = this.getItemFromLocalStorage("userPosts"); // get all user posts from local storage
      // if posts exist then get the last post id, convert it to a number
      // otherwise return 1000 as the first user created post id
      if (storagePosts && storagePosts.length) {
        const lastPostId = Number(storagePosts[storagePosts.length - 1].id); // gets the last post id
        return String(lastPostId + 1); // increments and returns it
      } else {
        return "1000";
      }
    },

    /**
     * Function to update the userPosts property in local storage.
     *
     * {param} (Object) - post : contains information about the new post to create.
     * {return} (void)
     */
    updatePostsInLocalStorage(post) {
      const storagePosts = this.getItemFromLocalStorage("userPosts"); // get all user posts from local storage
      // if posts exist then add the new post to the end
      // otherwise set a new array in 'userPosts' with the new created post
      if (storagePosts && storagePosts.length) {
        storagePosts.push(post); // add the new post in the array
        this.setItemInLocalStorage("userPosts", storagePosts); // set the update posts array in local storage
      } else {
        this.setItemInLocalStorage("userPosts", [post]);
      }
    },

    /**
     * Function to handle create post submission.
     *
     * {param} (none)
     * {return} (void)
     */
    async handleCreate() {
      // simple validation for empty values
      this.title.error = null;
      this.body.error = null;
      if (!this.title.value) {
        this.title.error = "Title is required";
      }
      if (!this.body.value) {
        this.body.error = "Body is required";
      }
      if (!this.title.value || !this.body.value) {
        return;
      }

      // post request headers
      const headers = {
        "Content-type": "application/json; charset=UTF-8",
      };

      // newly created post
      const post = {
        title: this.title.value,
        body: this.body.value,
        userId: "1",
      };

      try {
        this.fetching = true; // sets fetching to true to show user that the data is being fetched

        const response = await API.createPost(post, headers); // makes an API request to backend to create a new post
        response.data.id = this.getNewPostId(); // replace the returned '101' id
        this.updatePostsInLocalStorage(response.data); // updates the userPosts in local storage

        this.title.value = null; // sets form title input field to null
        this.body.value = null; // sets form body textarea to null
        this.fetching = false; // sets fetching to false to show user that another post is ready to be created
      } catch (error) {
        // show some error message to user here
        console.log(error);
        this.fetching = false; // sets fetching to false to show user that another post is ready to be created
      }
    },
  },
};
</script>

<style scoped>
.create-post {
  margin-block: 2rem;
  max-width: 800px;
  width: 100%;
}

.card-title {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgb(184, 184, 184);
}

.form {
  padding: 1.5rem;
}
</style>
