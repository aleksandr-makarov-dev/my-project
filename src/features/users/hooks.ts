import type { QueryConfig } from "@/common/lib/react-query";
import { getMyProfileAsync } from "./api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { MyProfileResponse } from "./types";
import type { ProblemDetails } from "@/common/api/api-types";

type UseGetMyProfileOptions = QueryConfig<typeof getMyProfileAsync>;

export const getMyProfileQueryOptions = () => {
  return queryOptions<MyProfileResponse, ProblemDetails>({
    queryKey: ["users", "me"],
    queryFn: () => getMyProfileAsync(),
  });
};

export function useGetMyProfileQuery(queryConfig?: UseGetMyProfileOptions) {
  return useQuery({
    ...getMyProfileQueryOptions(),
    ...queryConfig,
  });
}
