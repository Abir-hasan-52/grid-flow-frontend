"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import PasswordInput from "../shared/PasswordInput";

import { useResetPassword } from "@/hooks";
import { resetPasswordSchema } from "@/validation";

const OTP_LENGTH = 6;
const OTP_SLOT_KEYS = ["otp-1", "otp-2", "otp-3", "otp-4", "otp-5", "otp-6"];

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const { mutate: resetPassword, isPending } = useResetPassword();

  const form = useForm({
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: resetPasswordSchema,
    },

    onSubmit: ({ value }) => {
      if (!email) return;

      resetPassword(
        {
          email,
          otp: value.otp,
          newPassword: value.newPassword,
        },
        {
          onSuccess: () => {
            toast.add({
              title: "Password Reset Successful",
              description:
                "Your password has been changed. Please login with your new password.",
              type: "success",
            });

            router.replace("/login");
          },

          onError: (error: any) => {
            toast.add({
              title: "Password Reset Failed",
              description:
                error?.response?.data?.message ??
                "Invalid or expired OTP. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  // Email na thakle
  if (!email) {
    return (
      <div className="space-y-4 rounded-lg border bg-muted/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Email address is missing. Please request a new reset code.
        </p>

        <Button   className="w-full">
          <Link href="/forgot-password">Go to Forgot Password</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Email */}
      <div className="rounded-lg border bg-muted/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">Resetting password for</p>
        <p className="mt-1 break-all font-medium">{email}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* OTP */}
          <form.Field name="otp">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const error = field.state.meta.errors[0];

              return (
                <Field data-invalid={isInvalid} className="items-center">
                  <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>

                  <InputOTP
                    id={field.name}
                    name={field.name}
                    maxLength={OTP_LENGTH}
                    pattern={REGEXP_ONLY_DIGITS}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    autoFocus
                    value={field.state.value}
                    disabled={isPending}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                  >
                    <InputOTPGroup>
                      {OTP_SLOT_KEYS.map((slotKey, index) => (
                        <InputOTPSlot
                          key={slotKey}
                          index={index}
                          aria-invalid={isInvalid}
                          className="size-11 text-lg sm:size-12"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>

                  {isInvalid && error && <FieldError errors={[error]} />}
                </Field>
              );
            }}
          </form.Field>

          {/* New Password */}
          <form.Field name="newPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const error = field.state.meta.errors[0];

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>New Password</FieldLabel>

                  <PasswordInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Enter new password"
                    isInvalid={isInvalid}
                    disabled={isPending}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                  />

                  {isInvalid && error && <FieldError errors={[error]} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const error = field.state.meta.errors[0];

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>

                  <PasswordInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Confirm new password"
                    isInvalid={isInvalid}
                    disabled={isPending}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
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
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-foreground">
              Back to login
            </Link>

            <Link href="/forgot-password" className="hover:text-foreground">
              Request a new code
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}