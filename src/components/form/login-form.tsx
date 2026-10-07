"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

import { loginSchema } from "@/validation";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: isLoginPending } = useLogin();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "abirhasan5208@gmail.com",
      password: "Abir@1234",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };
      login(loginData, {
        onSuccess: (data) => {
          toast.add({
            title: "Login Successful",
            description: "You have successfully logged in.",
            type: "success",
          });
          router.push("/");
          console.log("Login successful:", data);
        },
        onError: (error) => {
          toast.add({
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
            type: "error",
          });
          console.error("Login failed:", error);
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="w-full"
    >
      <FieldGroup>
        {/* Email */}
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
                  aria-invalid={isInvalid}
                />

                {isInvalid && error && <FieldError errors={[error]} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            const error = field.state.meta.errors[0];

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-invalid={isInvalid}
                    className="pr-10"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </div>

                {isInvalid && error && <FieldError errors={[error]} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" className="w-full" disabled={isLoginPending}>
          {isLoginPending ? (
            <>
              <Spinner /> Login...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
