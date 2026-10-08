"use client";

import { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google-auth.provider";
import { Tooltip } from "@base-ui/react/tooltip";
 

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProvider>
        <Tooltip.Provider>
          
          {children}
           
          </Tooltip.Provider>
        </QueryProvider>
    </GoogleAuthProvider>
  );
}
