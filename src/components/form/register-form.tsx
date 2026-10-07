"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Check, ChevronsUpDown, Eye, EyeOff } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

import { cn } from "@/lib/utils";
import { toast } from "../ui/toast";
import { useRegisterUser } from "@/hooks";
import { useGetArea } from "@/hooks/area.hook";
import { registerSchema } from "@/validation";
import GoogleLoginButton from "../shared/GoogleLogin";

type Area = { id: string; name: string };

// Chaile eta @/hooks e move kore nite paro
function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

type PasswordInputProps = {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  isInvalid: boolean;
  disabled: boolean;
  onBlur: () => void;
  onChange: (value: string) => void;
};

function PasswordInput({
  id,
  name,
  value,
  placeholder,
  isInvalid,
  disabled,
  onBlur,
  onChange,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        value={value}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="new-password"
        aria-invalid={isInvalid}
        disabled={disabled}
        className="pr-10"
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </Button>
    </div>
  );
}

export default function RegisterForm() {
  const router = useRouter();

  const [areaSearch, setAreaSearch] = useState("");
  const [openArea, setOpenArea] = useState(false);
  const [selectedAreaName, setSelectedAreaName] = useState("");

  const debouncedAreaSearch = useDebounce(areaSearch, 300);

  // Register API
  const { mutate: register, isPending: isRegisterPending } = useRegisterUser();

  // Get Areas
  const { data: areaResponse, isLoading: isAreasLoading } = useGetArea({
    search: debouncedAreaSearch,
  });

  const areas: Area[] = areaResponse?.data ?? [];

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      areaId: "",
    },

    validators: {
      onSubmit: registerSchema,
    },

    onSubmit: ({ value }) => {
      register(
        {
          name: value.name,
          email: value.email,
          password: value.password,
          areaId: value.areaId,
        },
        {
          onSuccess: () => {
            toast.add({
              title: "Registration Successful",
              description: "Your account has been created successfully.",
              type: "success",
            });

            router.replace("/login");
          },

          onError: (error: any) => {
            toast.add({
              title: "Registration Failed",
              description:
                error?.response?.data?.message ??
                error?.message ??
                "Unable to create your account. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

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
          {/* Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const error = field.state.meta.errors[0];

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your name"
                    autoComplete="name"
                    aria-invalid={isInvalid}
                    disabled={isRegisterPending}
                  />

                  {isInvalid && error && <FieldError errors={[error]} />}
                </Field>
              );
            }}
          </form.Field>

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
                    disabled={isRegisterPending}
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

                  <PasswordInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Enter your password"
                    isInvalid={isInvalid}
                    disabled={isRegisterPending}
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
                  <FieldLabel htmlFor={field.name}>
                    Confirm Password
                  </FieldLabel>

                  <PasswordInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Confirm your password"
                    isInvalid={isInvalid}
                    disabled={isRegisterPending}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                  />

                  {isInvalid && error && <FieldError errors={[error]} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Area */}
          <form.Field name="areaId">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const error = field.state.meta.errors[0];

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="area">Area</FieldLabel>

                  <Popover open={openArea} onOpenChange={setOpenArea}>
                    <PopoverTrigger
                      id="area"
                      type="button"
                      role="combobox"
                      aria-expanded={openArea}
                      aria-invalid={isInvalid}
                      disabled={isRegisterPending}
                      onBlur={field.handleBlur}
                      className={cn(
                        "inline-flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                        !selectedAreaName && "text-muted-foreground",
                      )}
                    >
                      {selectedAreaName || "Select your area"}

                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-(--radix-popover-trigger-width) p-0"
                      align="start"
                    >
                      {/* shouldFilter={false}: search ta server-side hocche */}
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder="Search area..."
                          value={areaSearch}
                          onValueChange={setAreaSearch}
                        />

                        <CommandList>
                          {isAreasLoading ? (
                            <div className="flex items-center justify-center py-6">
                              <Spinner />
                            </div>
                          ) : (
                            <>
                              <CommandEmpty>No area found.</CommandEmpty>

                              <CommandGroup>
                                {areas.map((area) => (
                                  <CommandItem
                                    key={area.id}
                                    value={area.id}
                                    onSelect={() => {
                                      field.handleChange(area.id);
                                      setSelectedAreaName(area.name);
                                      setOpenArea(false);
                                      setAreaSearch("");
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 size-4",
                                        field.state.value === area.id
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />

                                    {area.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {isInvalid && error && <FieldError errors={[error]} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Register Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isRegisterPending}
          >
            {isRegisterPending ? (
              <>
                <Spinner />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </FieldGroup>
      </form>


      <GoogleLoginButton />
    </div>
  );
}