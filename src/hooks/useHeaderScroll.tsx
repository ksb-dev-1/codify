"use client";

import { useEffect, RefObject } from "react";

export const useHeaderScroll = (
  headerRef: RefObject<HTMLDivElement>
  //headerInnerRef: RefObject<HTMLDivElement>
): void => {
  useEffect(() => {
    const handleScroll = () => {
      let currentScrollpos = window.scrollY;

      if (currentScrollpos === 0) {
        headerRef.current!.style.transform = "translateY(0%)";
        headerRef.current!.style.boxShadow = "none";
      } else {
        headerRef.current!.style.boxShadow =
          "0px 4px 4px rgba(30, 10, 58, 0.1)";
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [headerRef]);
};
