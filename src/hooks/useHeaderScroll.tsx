"use client";

import { useSearchParams } from "next/navigation";

import { useEffect, RefObject } from "react";

export const useHeaderScroll = (
  headerRef: RefObject<HTMLDivElement>
  //headerInnerRef: RefObject<HTMLDivElement>
): void => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";
  useEffect(() => {
    const handleScroll = () => {
      let currentScrollpos = window.scrollY;

      if (currentScrollpos === 0) {
        headerRef.current!.style.transform = "translateY(0%)";
        headerRef.current!.style.boxShadow = "none";
      } else {
        if (theme === "light") {
          headerRef.current!.style.boxShadow = "0px 4px 4px rgba(30,10,58,0.1)";
        } else {
          headerRef.current!.style.boxShadow = "0px 4px 4px rgba(0,0,0,0.5)";
        }
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [headerRef, theme]);
};
