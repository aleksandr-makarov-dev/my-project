import { useGetMyProfileQuery } from "@/features/users/hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const getMyProfileQuery = useGetMyProfileQuery();

  return <div>{JSON.stringify(getMyProfileQuery.data, null, 2)}</div>;
}
