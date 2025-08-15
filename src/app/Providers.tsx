"use client";

import { Suspense } from "react";

// components
import ProgressBar from "@/components/ProgressBar";

// lib
import { getQueryClient } from "@/lib/getQueryClient";

// 3rd party
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = getQueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        {children}
        <Toaster position="top-center" />
      </QueryClientProvider>
    </SessionProvider>
  );
}
