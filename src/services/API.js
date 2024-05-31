import axios from "axios";

class AxiosAPI {
  constructor() {
    this.API = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  /**
   * This api will fetch all posts from 'backend'
   *
   * @param {none}
   * @returns {Promise<AxiosResponse>}
   */
  getAllPosts() {
    return this.API.get("/posts");
  }

  /**
   * This api will create a new post. It is being used in the PostCreate.vue component.
   *
   * @param {any} data - data being passed in body of api request
   * @param {Object} headers - any additional header needed to be passed as options
   * @returns {Promise<AxiosResponse>}
   */
  createPost(data) {
    // post request headers
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };

    return this.API.post("/posts", data, { headers });
  }
}

export default new AxiosAPI();
