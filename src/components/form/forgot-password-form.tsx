"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

import { useForgotPassword } from "@/hooks";
import { forgotPasswordSchema } from "@/validation";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },

    validators: {
      onSubmit: forgotPasswordSchema,
    },

    onSubmit: ({ value }) => {
      const email = value.email.trim().toLowerCase();

      forgotPassword(
        { email },
        {
          onSuccess: () => {
            toast.add({
              title: "OTP Sent",
              description: "A password reset OTP has been sent to your email.",
              type: "success",
            });

            const params = new URLSearchParams({ email });
            router.push(`/forgot-password/reset?${params.toString()}`);
          },

          onError: (error: any) => {
            toast.add({
              title: "Request Failed",
              description:
                error?.response?.data?.message ??
                "Unable to send password reset OTP.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const error = field.state.meta.errors[0];

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  autoFocus
                  disabled={isPending}
                  aria-invalid={isInvalid}
                />

                {isInvalid && error && <FieldError errors={[error]} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner />
              Sending OTP...
            </>
          ) : (
            "Send Reset Code"
          )}
        </Button>

        <Link
          href="/login"
          className="text-center text-sm text-muted-foreground hover:text-foreground"
        >
          Back to login
        </Link>
      </FieldGroup>
    </form>
  );
}