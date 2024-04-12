"use client";

import { SessionProvider } from "next-auth/react";

function AuthProvider({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
