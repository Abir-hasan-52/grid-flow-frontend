"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

import { loginSchema } from "@/validation";
import { useLogin } from "@/hooks";
import GoogleLoginButton from "../shared/GoogleLogin";
import Link from "next/link";

const demoAccounts = [
  {
    role: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
  },
  {
    role: "Zone Manager",
    email: "zone_manager@gmail.com",
    password: "zone_manager123",
  },
  {
    role: "Technician",
    email: "technician_one@gmail.com",
    password: "technician_one123",
  },
  {
    role: "Customer",
    email: "customer1@gmail.com",
    password: "customer123",
  },
];

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutate: login, isPending: isLoginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "abirhasan5208@gmail.com",
      password: "Abir@1234",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: ({ value }) => {
      login(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: (data) => {
            console.log("Login successful:", data);

            toast.add({
              title: "Login Successful",
              description: "You have successfully logged in.",
              type: "success",
            });

            router.push("/");
          },

          onError: (error) => {
            console.error("Login failed:", error);

            toast.add({
              title: "Login Failed",
              description: "Invalid email or password. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  // Demo Account Login
  const handleDemoLogin = (email: string, password: string) => {
    login(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          console.log("Demo login successful:", data);

          toast.add({
            title: "Login Successful",
            description: "Demo account login successful.",
            type: "success",
          });

          router.push("/");
        },

        onError: (error) => {
          console.error("Demo login failed:", error);

          toast.add({
            title: "Login Failed",
            description: "Unable to login with this demo account.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <div className="w-full">
      {/* Login Form */}
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
                    disabled={isLoginPending}
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
                      disabled={isLoginPending}
                      className="pr-10"
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={isLoginPending}
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

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button type="submit" className="w-full" disabled={isLoginPending}>
            {isLoginPending ? (
              <>
                <Spinner />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Google Login */}
      <GoogleLoginButton />

      {/* Demo Accounts */}
      <div className="mt-8 space-y-4">
        <div className="text-center">
          <p className="text-sm font-medium">Demo Accounts</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Choose a role to login instantly
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {demoAccounts.map((account) => (
            <Button
              key={account.email}
              type="button"
              variant="outline"
              disabled={isLoginPending}
              onClick={() => handleDemoLogin(account.email, account.password)}
              className="h-10 text-xs sm:text-sm"
            >
              {isLoginPending ? <Spinner /> : account.role}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
