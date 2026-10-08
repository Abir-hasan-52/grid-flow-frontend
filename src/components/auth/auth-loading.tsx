"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function AuthLoading() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="relative flex size-36 items-center justify-center">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-green-400"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner rotating ring */}
          <motion.div
            className="absolute inset-3 rounded-full border border-green-400/20 border-b-green-400/70"
            animate={{ rotate: -360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

            {/* Glowing effect */}
          <motion.div
            className="absolute size-24 rounded-full bg-cyan-400/20 blur-3xl"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Actual Logo */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/gridflow-transparent.png"
              alt="GridFlow"
              width={100}
              height={100}
              priority
              className="object-contain"
              unoptimized
            />
          </motion.div>
        </div>

        {/* Brand */}
        <motion.div
          className="mt-7 text-2xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white">Grid</span>
          <span className="text-green-400">Flow</span>
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="mt-3 flex items-center gap-2 text-sm text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>Checking authentication</span>

          <span className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="size-1.5 rounded-full bg-cyan-400"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
