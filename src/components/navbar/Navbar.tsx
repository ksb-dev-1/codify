"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";

// hooks
import { useNavbarShadowOnScroll } from "@/hooks/useNavbarScrollOnShadow";

// components
import LinkWithProgress from "@/components/shared/LinkWithProgress";
import LoadingNavbarContent from "./LoadingNavbarContent";
import AuthenticatedNavbarContent from "./AuthenticatedNavbar";
import UnauthenticatedNavbarContent from "./UnauthenticatedNavbarContent";
import SideNav from "./SideNav";

// 3rd party
import { useSession } from "next-auth/react";
import { IoMdMenu } from "react-icons/io";

export default function Navbar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const userImage = session?.user?.image;
  const title = "Codify";

  useNavbarShadowOnScroll(navbarRef);

  return (
    <>
      <nav
        ref={navbarRef}
        className="navbar-fixed fixed z-10 border-b bg-white left-0 top-0 right-0 h-16 flex items-center justify-center"
      >
        <div className="max-w-6xl w-full px-6 sm:px-8 md:px-16 flex items-center justify-between border-x h-16">
          <div className="flex items-center">
            {/* Menu Button */}
            <div className="md:hidden">
              {status === "loading" ? (
                <span className="skeleton inline-block h-8 w-8 rounded mr-2" />
              ) : session?.user?.id ? (
                <button
                  onClick={() => setIsSideNavOpen(true)}
                  aria-label="Open side navigation"
                  className="relative cursor-pointer inline-block h-8 w-8 border rounded mr-2 hover:bg-slate-100 transition-colors"
                >
                  <IoMdMenu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
                </button>
              ) : (
                ""
              )}
            </div>

            {/* Title */}
            <LinkWithProgress
              href="/"
              className={`${
                path === "/" ? "pointer-events-none" : "hover:text-primary_dark"
              } text-primary text-2xl font-extrabold transition-colors flex items-center`}
            >
              {title}
            </LinkWithProgress>
          </div>

          {status === "loading" ? (
            <LoadingNavbarContent />
          ) : userId ? (
            <AuthenticatedNavbarContent path={path} image={userImage} />
          ) : (
            <UnauthenticatedNavbarContent path={path} />
          )}
        </div>
      </nav>

      {/* Side Nav */}
      <SideNav
        path={path}
        isSideNavOpen={isSideNavOpen}
        setIsSideNavOpen={setIsSideNavOpen}
      />
    </>
  );
}
