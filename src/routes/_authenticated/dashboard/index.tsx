import { ACCESS_TOKEN_KEY } from "@/common/api/api-client";
import Button from "@/common/components/button";
import { useLogoutMutation } from "@/features/auth/hooks";
import { useGetMyProfileQuery } from "@/features/users/hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const getMyProfileQuery = useGetMyProfileQuery();
  const logoutMutation = useLogoutMutation();

  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        navigate({ to: "/auth/login" });
      },
      onError: (error) =>
        console.log("handleLogout:", JSON.stringify(error, null, 2)),
    });
  }

  return (
    <div>
      <pre>
        <code>{JSON.stringify(getMyProfileQuery.data, null, 2)}</code>
      </pre>
      <Button onClick={handleLogout} disabled={logoutMutation.isPending}>
        {logoutMutation.isPending ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
}
