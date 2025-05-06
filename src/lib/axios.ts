import axios from "axios";
export const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((request) => {
  return request;
});

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public details: any
  ) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

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
