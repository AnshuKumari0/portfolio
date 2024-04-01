"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface RootLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function AuthProvider({ children, session }: RootLayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
