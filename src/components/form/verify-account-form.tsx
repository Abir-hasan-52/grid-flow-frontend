"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldLabel } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useVerifyAccount } from "@/hooks";

const OTP_LENGTH = 6;
const OTP_SLOT_KEYS = ["otp-1", "otp-2", "otp-3", "otp-4", "otp-5", "otp-6"];

export default function VerifyAccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: verifyAccount, isPending } = useVerifyAccount();

  const handleVerify = (value: string = otp) => {
    if (value.length !== OTP_LENGTH) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!email || isPending) return;

    verifyAccount(
      { email, otp: value },
      {
        onSuccess: () => {
          toast.add({
            title: "Account Verified",
            description: "Your account has been verified. Please login.",
            type: "success",
          });
          router.replace("/login");
        },

        onError: (error: any) => {
          setErrorMessage(
            error?.response?.data?.message ??
              error?.message ??
              "Invalid or expired OTP. Please try again.",
          );
        },
      },
    );
  };

  // Email na thakle
  if (!email) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Invalid verification link</CardTitle>
          <CardDescription>
            Email address is missing. Please register again to receive a new
            verification code.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/register">Go to Register</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Verify your account</CardTitle>
        <CardDescription>
          We sent a 6-digit code to{" "}
          <span className="break-all font-medium text-foreground">{email}</span>
          . Can&apos;t find it? Check your spam or junk folder.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleVerify();
        }}
      >
        <CardContent>
          <Field data-invalid={!!errorMessage} className="items-center">
            <FieldLabel htmlFor="otp" className="sr-only">
              Enter OTP
            </FieldLabel>

            <InputOTP
              id="otp"
              name="otp"
              maxLength={OTP_LENGTH}
              pattern={REGEXP_ONLY_DIGITS}
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              value={otp}
              disabled={isPending}
              onChange={(value) => {
                setOtp(value);
                if (errorMessage) setErrorMessage("");
              }}
              onComplete={(value) => handleVerify(value)}
            >
              <InputOTPGroup>
                {OTP_SLOT_KEYS.map((slotKey, index) => (
                  <InputOTPSlot
                    key={slotKey}
                    index={index}
                    aria-invalid={!!errorMessage}
                    className="size-11 text-lg sm:size-12"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {errorMessage && (
              <p className="text-center text-sm text-destructive" role="alert">
                {errorMessage}
              </p>
            )}
          </Field>
        </CardContent>

        <CardFooter className="mt-6 flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || otp.length !== OTP_LENGTH}
          >
            {isPending ? (
              <>
                <Spinner />
                Verifying...
              </>
            ) : (
              "Verify Account"
            )}
          </Button>

          <Link
            href="/register"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Wrong email? Back to register
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}