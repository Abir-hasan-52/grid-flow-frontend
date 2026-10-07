import Image from "next/image";

import Logo from "@/components/shared/Logo";
import VerifyAccountForm from "@/components/form/verify-account-form";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      {/* 
          Left Side - Verify Form
     */}
      <section className="flex flex-col px-6 py-8 md:px-10 lg:px-12">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Logo showText size="md" href="/" />
        </div>

        {/* Verify Content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            {/* Heading */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Verify your account
              </h1>

              <p className="text-sm text-muted-foreground">
                Enter the verification code sent to your email address.
              </p>
            </div>

            {/* Verify Account Form */}
            <Suspense fallback={<div>Loading...</div>}>
              <VerifyAccountForm />
            </Suspense>
          </div>
        </div>

        {/* Footer */}
        <p className="pt-6 text-center text-xs text-muted-foreground md:text-left">
          © {new Date().getFullYear()} GridFlow. All rights reserved.
        </p>
      </section>

      {/*  Right Side - Image*/}
      <section className="relative hidden overflow-hidden bg-muted lg:block">
        <Image
          src="/register-bg.png"
          alt="GridFlow smart power management"
          fill
          priority
          sizes="50vw"
          className="object-cover"
          unoptimized
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />

        {/* Text */}
        <div className="absolute inset-x-0 bottom-0 p-10 text-white xl:p-14">
          <div className="max-w-lg space-y-4">
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
              Account Verification
            </div>

            <h2 className="text-3xl font-bold tracking-tight xl:text-4xl">
              One step away.
              <br />
              Welcome to GridFlow.
            </h2>

            <p className="max-w-md text-sm leading-6 text-white/75">
              Verify your email address to activate your GridFlow account and
              start managing your power connection.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
