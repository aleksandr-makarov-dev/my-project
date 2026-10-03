import { ACCESS_TOKEN_KEY } from "@/common/api/api-client";
import Button, { buttonVariants } from "@/common/components/button";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetHeader,
  FieldsetLegend,
} from "@/common/components/fieldset";
import { cn } from "@/common/lib/cn";
import { LoginByEmailForm } from "@/features/auth/components/login-by-email-form";
import { VerifyLoginByEmailForm } from "@/features/auth/components/verify-login-by-email-form";
import {
  useLoginByEmailMutation,
  useVerifyLoginByEmailMutation,
} from "@/features/auth/hooks";
import {
  type LoginByEmailInput,
  type VerifyLoginByEmailInput,
} from "@/features/auth/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

const LOGIN_BY_EMAIL_FORM = "login_by_email_form";
const VERIFY_LOGIN_BY_EMAIL_FORM = "verify_login_by_email_form";

function RouteComponent() {
  const navigate = Route.useNavigate();
  const loginByEmailMutation = useLoginByEmailMutation();
  const verifyLoginByEmailMutation = useVerifyLoginByEmailMutation();

  const [verificationEmail, setVerificationEmail] = useState<string | null>(
    null,
  );

  function handleRequestCode(data: LoginByEmailInput) {
    loginByEmailMutation.mutate(data, {
      onSuccess: () => {
        setVerificationEmail(data.email);
      },
      onError: (error) => console.log(JSON.stringify(error, null, 2)),
    });
  }

  function handleVerifyCode(data: VerifyLoginByEmailInput) {
    verifyLoginByEmailMutation.mutate(data, {
      onSuccess: (response) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
        navigate({ to: "/dashboard" });
      },
      onError: (error) => console.log(JSON.stringify(error, null, 2)),
    });
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-2">
      <main className="max-w-96 w-full">
        <Fieldset>
          <FieldsetHeader>
            <FieldsetLegend>Sign in to account</FieldsetLegend>
            <FieldsetDescription>
              Enter your details or continue with a provider
            </FieldsetDescription>
          </FieldsetHeader>
          <div className="space-y-2">
            <a
              href={`${import.meta.env.VITE_API_ORIGIN}/authentication/login/external/Google`}
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              Continue with Google
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              or sign in with email
            </span>
            <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
          </div>
          {verificationEmail === null ? (
            <div className="space-y-3">
              <LoginByEmailForm
                formId={LOGIN_BY_EMAIL_FORM}
                defaultValues={{ email: "" }}
                onSubmit={handleRequestCode}
              />
              <Button
                form={LOGIN_BY_EMAIL_FORM}
                className="w-full"
                type="submit"
                disabled={loginByEmailMutation.isPending}
              >
                {loginByEmailMutation.isPending
                  ? "Sending code..."
                  : "Send code"}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <VerifyLoginByEmailForm
                formId={VERIFY_LOGIN_BY_EMAIL_FORM}
                defaultValues={{ email: verificationEmail, code: "" }}
                onSubmit={handleVerifyCode}
              />
              <Button
                form={VERIFY_LOGIN_BY_EMAIL_FORM}
                className="w-full"
                type="submit"
                disabled={verifyLoginByEmailMutation.isPending}
              >
                {verifyLoginByEmailMutation.isPending
                  ? "Verifying code..."
                  : "Verify code"}
              </Button>
            </div>
          )}
        </Fieldset>
      </main>
    </div>
  );
}
