import type { MutationConfig } from "@/common/lib/react-query";
import { loginByEmailAsync, logoutAsync, verifyLoginByEmailAsync } from "./api";
import { useMutation } from "@tanstack/react-query";

type UseLoginByEmailOptions = MutationConfig<typeof loginByEmailAsync>;

export function useLoginByEmailMutation(options?: UseLoginByEmailOptions) {
  return useMutation({
    ...options,
    mutationFn: loginByEmailAsync,
  });
}

type UseVerifyLoginByEmailOptions = MutationConfig<
  typeof verifyLoginByEmailAsync
>;

export function useVerifyLoginByEmailMutation(
  options?: UseVerifyLoginByEmailOptions,
) {
  return useMutation({
    ...options,
    mutationFn: verifyLoginByEmailAsync,
  });
}

type UseLogoutOptions = MutationConfig<typeof logoutAsync>;

export function useLogoutMutation(options?: UseLogoutOptions) {
  return useMutation({ ...options, mutationFn: logoutAsync });
}
