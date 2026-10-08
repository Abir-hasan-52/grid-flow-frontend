/** biome-ignore-all assist/source/organizeImports: <explanation> */
/** biome-ignore-all lint/style/useImportType: <explanation> */
"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types";
import AccessDenied from "./access-denied";
// import { UserRole } from "@/types/user.type";
interface RoleGuardProps {
  children: ReactNode;
  roles: UserRole[]; 
}

export default function RoleGuard({ children, roles }: RoleGuardProps) {
  const { data, isPending, isError } = useGetMe();
  console.log("authGuard", data);
  const router = useRouter();

  const user = data?.data;

  const  isAuthorized= !!user && roles.includes(user.role as UserRole);
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
//   if (!isAuthorized) {
//     router.replace("/access-denied");
//     return <AccessDenied />;
//   }
  if (isAuthorized) {
    return <>{children}</>;
  }

//   return <>{children}</>;
return <AccessDenied />;
 
}
