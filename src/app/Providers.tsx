"use client";

import { ReactNode } from "react";

// context
import { ThemeProvider } from "@/context/ThemeContext";

// 3rd party libraries
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
}
