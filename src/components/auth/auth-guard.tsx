/** biome-ignore-all assist/source/organizeImports: <explanation> */
/** biome-ignore-all lint/style/useImportType: <explanation> */
"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data, isPending, isError } = useGetMe();
  console.log("authGuard", data);
  const router = useRouter();

  const user = data?.data;
  useEffect(() => {
    if (isPending) return;
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router]);

  if (isPending) {
    return <AuthLoading />;
  }
  if (isError || !user) {
    return <AuthLoading />;
  }

  return <>{children}</>;
 
}
