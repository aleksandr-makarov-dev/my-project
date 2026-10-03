import Axios from "axios";
import { problemDetailsSchema, type ProblemDetails } from "./api-types";
import { rotateRefreshTokenAsync } from "@/features/auth/api";

export const ACCESS_TOKEN_KEY = "access_token";

const clientConfig = {
  baseURL: import.meta.env.VITE_API_ORIGIN,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
};

export const apiClient = Axios.create(clientConfig);
export const refreshTokenClient = Axios.create(clientConfig);

refreshTokenClient.interceptors.response.use((response) => response.data);

apiClient.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken) {
    request.headers.set("Authorization", `Bearer ${accessToken}`);
  } else {
    request.headers.delete("Authorization");
  }

  return request;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await rotateRefreshTokenAsync();

        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

        originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);

        return apiClient(originalRequest);
      } catch (refreshError) {
        if (
          Axios.isAxiosError(refreshError) &&
          refreshError.response?.status === 401
        ) {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
        }

        error = refreshError;
      }
    }

    if (Axios.isAxiosError(error)) {
      const parseResult = problemDetailsSchema.safeParse(error.response?.data);

      if (parseResult.success) {
        return Promise.reject(parseResult.data);
      }

      // fallback if the response body does not match ProblemDetails
      return Promise.reject({
        title: "An unexpected error occurred",
        status: error.response?.status ?? 500,
        detail:
          typeof error.response?.data === "string"
            ? error.response.data
            : error.message,
      } satisfies ProblemDetails);
    }

    return Promise.reject({
      title: "An unexpected error occurred",
      status: 500,
      detail: "Something went wrong.",
    } satisfies ProblemDetails);
  },
);
