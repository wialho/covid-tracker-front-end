import axios from "axios";

const client = axios.create({
  // Later read this URL from an environment variable
  baseURL: ''
});

export default client;