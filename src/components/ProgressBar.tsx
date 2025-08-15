"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

// Optional: you can import a minimal NProgress CSS
// import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start immediately on navigation change
    NProgress.start();

    // Stop when route change is done
    NProgress.done();

    // Cleanup if component unmounts during navigation
    return () => {
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return null; // No visible UI element
}
