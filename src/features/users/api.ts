import { apiClient } from "@/common/api/api-client";
import type { MyProfileResponse } from "./types";

export async function getMyProfileAsync(): Promise<MyProfileResponse> {
  return await apiClient.get("/users/me");
}
