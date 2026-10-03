import { apiClient, refreshTokenClient } from "@/common/api/api-client";
import type {
  LoginByEmailInput,
  RotateRefreshTokenResponse,
  VerifyLoginByEmailInput,
  VerifyLoginByEmailResponse,
} from "./types";

export function loginByEmailAsync(data: LoginByEmailInput): Promise<void> {
  return apiClient.post("/authentication/login/email", data);
}

export function verifyLoginByEmailAsync(
  data: VerifyLoginByEmailInput,
): Promise<VerifyLoginByEmailResponse> {
  return apiClient.post("/authentication/login/email/verify", data);
}

let refreshPromise: Promise<RotateRefreshTokenResponse> | null = null;

export function rotateRefreshTokenAsync(): Promise<RotateRefreshTokenResponse> {
  return (refreshPromise ??= refreshTokenClient
    .post<RotateRefreshTokenResponse, RotateRefreshTokenResponse>(
      "/authentication/refresh-token",
    )
    .finally(() => {
      refreshPromise = null;
    }));
}

export function logoutAsync(): Promise<void> {
  return apiClient.post("/authentication/logout");
}
