'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProviderProps } from 'next-auth/react';
import QueryProvider from "@/components/providers/tanstack-provider";
export default function Providers({
  // session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* <SessionProvider session={session}> */}
              {children}
            {/* </SessionProvider> */}
          </ThemeProvider>
        </QueryProvider>
    </>
  );
}
