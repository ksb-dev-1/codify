import { useLayoutEffect } from "react";

export function useToggleLockScroll(isOpen: boolean) {
  useLayoutEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const navbar = document.querySelector(
      ".navbar-fixed"
    ) as HTMLElement | null;

    const userProfile = document.querySelector(
      ".user-profile-fixed"
    ) as HTMLElement | null;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      if (navbar) {
        navbar.style.paddingRight = `${scrollbarWidth}px`;
      }
      if (userProfile) {
        userProfile.style.marginRight = `0.25px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      if (navbar) {
        navbar.style.paddingRight = "";
      }
      if (userProfile) {
        userProfile.style.marginRight = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      if (navbar) navbar.style.paddingRight = "";
      if (userProfile) {
        userProfile.style.marginRight = "";
      }
    };
  }, [isOpen]);
}
