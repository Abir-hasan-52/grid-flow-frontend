"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";

import { loginSchema } from "@/validation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: ({ value }) => {
      console.log(value);
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
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            const error = field.state.meta.errors[0];

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
                    field.handleChange(e.target.value)
                  }
                  placeholder="Enter your email"
                  autoComplete="email"
                  aria-invalid={isInvalid}
                />

                {isInvalid && error && (
                  <FieldError errors={[error]} />
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

            const error = field.state.meta.errors[0];

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Password
                </FieldLabel>

                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-invalid={isInvalid}
                    className="pr-10"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setShowPassword((visible) => !visible)
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
                  <FieldError errors={[error]} />
                )}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </FieldGroup>
    </form>
  );
}