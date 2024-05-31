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

          <base-button type="submit" :disabled="isFetching">
            {{ buttonText }}
          </base-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    ...mapGetters(["isFetching", "postErrors"]),

    /**
     * Computed property to set the text of button. If data is being fetched
     * then set the text to 'Creating...' otherwise set it to 'Create'.
     * Used to show user that they have made a create request.
     *
     * @param {none}
     * @returns {String}
     */
    buttonText() {
      return this.isFetching ? "Creating..." : "Create";
    },
  },

  methods: {
    ...mapActions(["createPost"]),

    /**
     * Function to handle create post submission.
     *
     * @param {none}
     * @returns {void}
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

      // newly created post
      const post = {
        title: this.title.value,
        body: this.body.value,
        userId: "1",
      };

      await this.createPost({ post });

      this.title.value = null; // sets form title input field to null
      this.body.value = null; // sets form body textarea to null
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
