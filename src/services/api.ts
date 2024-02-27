import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors podem ser adicionados da mesma forma que no exemplo de JavaScript

export default api;
