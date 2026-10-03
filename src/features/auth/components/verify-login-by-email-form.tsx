import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyLoginByEmailInputSchema,
  type VerifyLoginByEmailInput,
} from "../types";
import { Field } from "@/common/components/field";
import Input from "@/common/components/input";

type VerifyLoginByEmailFormProps = {
  formId?: string;
  defaultValues: VerifyLoginByEmailInput;
  onSubmit: SubmitHandler<VerifyLoginByEmailInput>;
};

export function VerifyLoginByEmailForm({
  formId,
  defaultValues,
  onSubmit,
}: VerifyLoginByEmailFormProps) {
  const { control, handleSubmit } = useForm<VerifyLoginByEmailInput>({
    resolver: zodResolver(verifyLoginByEmailInputSchema),
    defaultValues: defaultValues,
  });

  return (
    <form id={formId} className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <Field
        control={control}
        name="email"
        label="Email"
        render={({ field, fieldState }) => (
          <Input
            className="w-full"
            aria-invalid={fieldState.invalid}
            {...field}
          />
        )}
      />
      <Field
        control={control}
        name="code"
        label="Code"
        render={({ field, fieldState }) => (
          <Input
            className="w-full"
            aria-invalid={fieldState.invalid}
            {...field}
          />
        )}
      />
    </form>
  );
}
