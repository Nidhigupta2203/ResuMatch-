import axios from "axios";

const instance = axios.create({
  baseURL: "https://resumatch-backend-rzz7.onrender.com",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
