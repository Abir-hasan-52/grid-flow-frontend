"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type PasswordInputProps = {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  isInvalid: boolean;
  disabled: boolean;
  autoComplete?: string;
  onBlur: () => void;
  onChange: (value: string) => void;
};

export default function PasswordInput({
  id,
  name,
  value,
  placeholder,
  isInvalid,
  disabled,
  autoComplete = "new-password",
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
        autoComplete={autoComplete}
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
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </Button>
    </div>
  );
}