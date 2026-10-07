import Image from "next/image";
import Link from "next/link";

import Logo from "@/components/shared/Logo";
import ForgotPasswordForm from "@/components/form/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      {/* Left */}
      <section className="flex flex-col px-6 py-8 md:px-10 lg:px-12">
        <div className="flex justify-center md:justify-start">
          <Logo showText size="md" href="/" />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Forgot your password?
              </h1>

              <p className="text-sm text-muted-foreground">
                Enter your email and we'll send you a
                password reset code.
              </p>
            </div>

            <ForgotPasswordForm />

            <p className="text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="pt-6 text-center text-xs text-muted-foreground md:text-left">
          © {new Date().getFullYear()} GridFlow. All rights reserved.
        </p>
      </section>

      {/* Right */}
      <section className="relative hidden overflow-hidden bg-muted lg:block">
        <Image
          src="/login-bg.png"
          alt="GridFlow smart power management"
          fill
          priority
          sizes="50vw"
          className="object-cover"
          unoptimized
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 p-10 text-white xl:p-14">
          <div className="max-w-lg space-y-4">
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
              Account Security
            </div>

            <h2 className="text-3xl font-bold tracking-tight xl:text-4xl">
              Secure your account.
              <br />
              Get back in control.
            </h2>

            <p className="max-w-md text-sm leading-6 text-white/75">
              Reset your GridFlow password securely and
              continue managing your power connection.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}