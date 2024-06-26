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
   * {param} (none)
   * {return} (Promise<AxiosResponse>)
   */
  getAllPosts() {
    return this.API.get("/posts");
  }

  /**
   * This api will create a new post. It is being used in the PostCreate.vue component.
   *
   * {param} (any) - data being passed in body of api request
   * {param} (Object) - any additional header needed to be passed as options
   * {return} (Promise<AxiosResponse>)
   */
  createPost(data, headers) {
    return this.API.post("/posts", data, { headers: headers });
  }
}

export default new AxiosAPI();
