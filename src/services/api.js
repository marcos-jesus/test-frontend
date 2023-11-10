import axios from "axios";

const api = axios.create({
  // baseURL: process.env.VUE_APP_BASE_URL, Você pode criar um .env e setar VUE_APP_BASE_URL com a url que está abaixo, o recurso vem de route-dictionary.
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default api;
