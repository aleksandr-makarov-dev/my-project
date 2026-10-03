import z from "zod";

export const loginByEmailInputSchema = z.object({
  email: z.email(),
});

export type LoginByEmailInput = z.infer<typeof loginByEmailInputSchema>;

export const verifyLoginByEmailInputSchema = z.object({
  email: z.email(),
  code: z.string().length(6),
});

export type VerifyLoginByEmailInput = z.infer<
  typeof verifyLoginByEmailInputSchema
>;

export type VerifyLoginByEmailResponse = {
  accessToken: string;
};
