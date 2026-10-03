import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginByEmailInputSchema, type LoginByEmailInput } from "../types";
import { Field } from "@/common/components/field";
import Input from "@/common/components/input";

type LoginByEmailFormProps = {
  formId?: string;
  defaultValues: LoginByEmailInput;
  onSubmit: SubmitHandler<LoginByEmailInput>;
};

export function LoginByEmailForm({
  formId,
  defaultValues,
  onSubmit,
}: LoginByEmailFormProps) {
  const { control, handleSubmit } = useForm<LoginByEmailInput>({
    resolver: zodResolver(loginByEmailInputSchema),
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
    </form>
  );
}
