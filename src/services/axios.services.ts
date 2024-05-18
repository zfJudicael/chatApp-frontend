import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

const chatApp = axios.create({
  baseURL: `${import.meta.env.VITE_CHATAPP_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
});

const chatAppAPI = axios.create({
  baseURL: `${import.meta.env.VITE_CHATAPP_URL_API}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
});

chatAppAPI.interceptors.request.use(
  async (config) => {
    if (useAuthStore().token) {
      config.headers.Authorization = useAuthStore().token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
)

export {
  chatApp,
  chatAppAPI
}