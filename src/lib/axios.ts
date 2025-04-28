import axios from "axios";
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
      console.log(error);
      const status = error.response?.status || 500;
      const errorMessage = error.response?.data?.message || "Unknown error";
      const errorCode = error.response?.data?.code || "Unknown code";
      const errorData = error.response?.data || {};
      return Promise.reject(error);
    }
  }
);

