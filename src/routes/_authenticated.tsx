import { ACCESS_TOKEN_KEY } from "@/common/api/api-client";
import { rotateRefreshTokenAsync } from "@/features/auth/api";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) return;

    try {
      const { accessToken } = await rotateRefreshTokenAsync();
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } catch {
      throw redirect({
        to: "/auth/login",
        search: { redirect: location.href },
      });
    }
  },
  component: Outlet,
});
