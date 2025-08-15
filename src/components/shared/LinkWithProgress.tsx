"use client";

import Link from "next/link";
import NProgress from "nprogress";

export default function LinkWithProgress(
  props: React.ComponentProps<typeof Link>
) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        // Only trigger progress on normal left-click navigations
        if (
          !e.metaKey &&
          !e.ctrlKey &&
          !e.shiftKey &&
          e.button === 0 &&
          props.href !== "#" // Ignore dummy links
        ) {
          NProgress.start();
        }
        props.onClick?.(e);
      }}
    />
  );
}
