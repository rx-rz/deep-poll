import axios from "axios";
import { APIError } from "./errors";
export const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((request) => {
  return request;
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const errorObject = error.response?.data;
      const status = error?.status || 500;
      const message = errorObject?.message || "Unknown error";
      const code = error?.code || "Unknown code";
      const details = errorObject?.details || null;
      return Promise.reject(new APIError(message, status, code, details));
    }
  }
);
