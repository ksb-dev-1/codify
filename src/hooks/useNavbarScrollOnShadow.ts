"use client";

import { useEffect, RefObject } from "react";

export const useNavbarShadowOnScroll = (
  navbarRef: RefObject<HTMLDivElement | null>
): void => {
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollpos = window.scrollY;

      if (currentScrollpos === 0) {
        navbarRef.current!.style.boxShadow = "none";
      } else {
        navbarRef.current!.style.boxShadow = "0 1px 5px rgba(30, 10, 58, 0.15)";
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [navbarRef]);
};
