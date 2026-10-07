"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Spinner } from "../ui/spinner";

import { loginSchema } from "@/validation";
import { useGoogleOAuthLogin, useLogin } from "@/hooks";
import { toast } from "../ui/toast";

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

  const {
    mutate: login,
    isPending: isLoginPending,
  } = useLogin();

  const {
    mutate: googleLogin,
    isPending: isGoogleLoginPending,
  } = useGoogleOAuthLogin();

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
            toast.add({
              title: "Login Successful",
              description: "You have successfully logged in.",
              type: "success",
            });

            console.log("Login successful:", data);

            router.push("/");
          },

          onError: (error) => {
            toast.add({
              title: "Login Failed",
              description:
                "Invalid email or password. Please try again.",
              type: "error",
            });

            console.error("Login failed:", error);
          },
        },
      );
    },
  });

  
  // Demo Account Login
  const handleDemoLogin = (
    email: string,
    password: string,
  ) => {
    login(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          toast.add({
            title: "Login Successful",
            description: "Demo account login successful.",
            type: "success",
          });

          console.log("Demo login successful:", data);

          router.push("/");
        },

        onError: (error) => {
          toast.add({
            title: "Login Failed",
            description:
              "Unable to login with this demo account.",
            type: "error",
          });

          console.error("Demo login failed:", error);
        },
      },
    );
  };

 
  // Google Login Success

  const handleGoogleLoginSuccess = (credentialResponse: {
    credential?: string;
  }) => {
    const tokenId = credentialResponse.credential;

    if (!tokenId) {
      toast.add({
        title: "Google Login Failed",
        description:
          "No credential received from Google.",
        type: "error",
      });

      return;
    }

    googleLogin(
      {
        googleId: tokenId,
      },
      {
        onSuccess: (data) => {
          toast.add({
            title: "Google Login Successful",
            description:
              "You have successfully logged in with Google.",
            type: "success",
          });

          console.log(
            "Google Login successful:",
            data,
          );

          router.push("/");
        },

        onError: (error) => {
          toast.add({
            title: "Google Login Failed",
            description:
              "An error occurred while trying to log in with Google.",
            type: "error",
          });

          console.error(
            "Google Login failed:",
            error,
          );
        },
      },
    );
  };

 
  // Google Login Error

  const handleGoogleLoginError = () => {
    toast.add({
      title: "Google Login Failed",
      description:
        "An error occurred while trying to log in with Google.",
      type: "error",
    });
  };

  const isAnyLoginPending =
    isLoginPending || isGoogleLoginPending;

  return (
    <div className="w-full">

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
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              const error =
                field.state.meta.errors[0];

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Email
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value,
                      )
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                    aria-invalid={isInvalid}
                    disabled={isAnyLoginPending}
                  />

                  {isInvalid && error && (
                    <FieldError
                      errors={[error]}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              const error =
                field.state.meta.errors[0];

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value,
                        )
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      aria-invalid={isInvalid}
                      disabled={isAnyLoginPending}
                      className="pr-10"
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={isAnyLoginPending}
                      onClick={() =>
                        setShowPassword(
                          (visible) => !visible,
                        )
                      }
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>

                  {isInvalid && error && (
                    <FieldError
                      errors={[error]}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isAnyLoginPending}
          >
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

      <div className="mt-6 space-y-4">
        <FieldSeparator>OR</FieldSeparator>

        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={
              handleGoogleLoginSuccess
            }
            onError={handleGoogleLoginError}
          />
        </div>
      </div>

      {/* =========================
          Demo Accounts
      ========================== */}

      <div className="mt-8 space-y-4">
        <div className="text-center">
          <p className="text-sm font-medium">
            Demo Accounts
          </p>

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
              disabled={isAnyLoginPending}
              onClick={() =>
                handleDemoLogin(
                  account.email,
                  account.password,
                )
              }
              className="h-10 text-xs sm:text-sm"
            >
              {isLoginPending ? (
                <Spinner />
              ) : (
                account.role
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}