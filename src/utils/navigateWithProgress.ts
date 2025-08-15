// utils/navigateWithProgress.ts
"use client";

import NProgress from "nprogress";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const navigateWithProgress = async (
  router: AppRouterInstance,
  url: string
) => {
  NProgress.start();
  router.push(url);
  // Slight delay to let the route change begin (optional)
  setTimeout(() => NProgress.done(), 300);
};
