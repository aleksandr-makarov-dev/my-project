import { apiClient } from "@/common/api/api-client";
import type {
  LoginByEmailInput,
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
