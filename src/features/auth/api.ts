import { apiClient, refreshTokenClient } from "@/common/api/api-client";
import type {
  LoginByEmailInput,
  RotateRefreshTokenResponse,
  VerifyLoginByEmailInput,
  VerifyLoginByEmailResponse,
} from "./types";

export async function loginByEmailAsync(
  data: LoginByEmailInput,
): Promise<void> {
  return await apiClient.post("/authentication/login/email", data);
}

export async function verifyLoginByEmailAsync(
  data: VerifyLoginByEmailInput,
): Promise<VerifyLoginByEmailResponse> {
  return await apiClient.post("/authentication/login/email/verify", data);
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
