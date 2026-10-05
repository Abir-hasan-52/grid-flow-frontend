import LoginForm from "@/components/form/login-form";
import Logo from "@/components/shared/Logo";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      {/* Left Side - Login */}
      <section className="flex flex-col px-6 py-8 md:px-10 lg:px-12">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Logo showText size="md" href="/" />
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            {/* Heading */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h1>

              <p className="text-sm text-muted-foreground">
                Sign in to your GridFlow account
              </p>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Register */}
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 text-center text-xs text-muted-foreground md:text-left">
          © {new Date().getFullYear()} GridFlow. All rights reserved.
        </div>
      </section>

      {/* Right Side - Image  */}
      <section className="relative hidden overflow-hidden bg-muted lg:block">
        <Image
          src="/login-bg.png"
          alt="GridFlow power management"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />

        {/* Content on Image */}
        <div className="absolute inset-x-0 bottom-0 p-10 text-white xl:p-14">
          <div className="max-w-lg space-y-4">
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
              Smart Power Management
            </div>

            <h2 className="text-3xl font-bold tracking-tight xl:text-4xl">
              Smarter energy.
              <br />
              Better tomorrow.
            </h2>

            <p className="max-w-md text-sm leading-6 text-white/75">
              Monitor, manage, and optimize your power network with
              GridFlow&apos;s intelligent energy management platform.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
