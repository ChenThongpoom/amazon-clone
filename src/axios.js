import axios from "axios";

const instance = axios.create({
  // The api (cloud function) URL
  baseURL: "https://us-central1-clone-296f3.cloudfunctions.net/api",
  // "http://localhost:5001/clone-296f3/us-central1/api",
});

export default instance;

// https://us-central1-clone-296f3.cloudfunctions.net/api
