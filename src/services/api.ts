import axios from "axios";

const api = axios.create({
  baseURL: "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api",
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1Ni2sInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0Ijo2sNzI3ODMwNTc5LCJleHAiOjE3MzA0MjI1Nzl9.fo9pl0asdH-5EaqOrW_IQD_dhVm7uCDIYIEjCpAJmWvIs`;
  return config;
});

export default api;
