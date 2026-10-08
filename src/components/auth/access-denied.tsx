"use client";

import { motion } from "motion/react";
import { ShieldX, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AccessDenied() {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mb-6 flex size-24 items-center justify-center"
        >
          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/15 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Circle */}
          <div className="relative flex size-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
            <ShieldX className="size-10 text-red-500" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl font-bold tracking-tight"
        >
          Access Denied
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-3 text-sm leading-6 text-muted-foreground"
        >
          You don&apos;t have permission to access this page.
          Please contact your administrator if you believe this is a mistake.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-7 flex items-center gap-3"
        >
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            <ArrowLeft />
            Go Back
          </Button>

          <Button onClick={() => router.push("/")}>
            <Home />
            Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}