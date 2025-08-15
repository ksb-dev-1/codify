"use client";

import { Dispatch, SetStateAction, useRef } from "react";

// components
import LinkWithProgress from "../shared/LinkWithProgress";

// hooks
import { useAutoCloseOnGreaterThanOrEqualToBreakpoint } from "@/hooks/useAutoCloseOnGreaterThanOrEqualToBreakPoint";
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";
import { useToggleLockScroll } from "@/hooks/useToggleLockScroll";

// 3rd party
import { useSession } from "next-auth/react";
import { MdOutlineLogin } from "react-icons/md";

// utils
import { NavLinks } from "@/utils/constants";

export default function SideNav({
  path,
  isSideNavOpen,
  setIsSideNavOpen,
}: {
  path: string;
  isSideNavOpen: boolean;
  setIsSideNavOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const sideNavRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();

  useHandleOutsideClick(sideNavRef, setIsSideNavOpen);
  useToggleLockScroll(isSideNavOpen);
  useAutoCloseOnGreaterThanOrEqualToBreakpoint(
    isSideNavOpen,
    setIsSideNavOpen,
    728
  );

  return (
    <aside
      className={`${
        isSideNavOpen
          ? "scale-100 opacity-100"
          : "scale-0 opacity-0 pointer-events-none"
      } transition-opacity fixed z-10 inset-0 backdrop-blur-sm bg-[rgba(0,0,0,0.4)]`}
    >
      <div
        ref={sideNavRef}
        className={`${
          isSideNavOpen ? "translate-x-0" : "-translate-x-10"
        } bg-white w-[250px] h-full shadow-xl transition-transform`}
      >
        <h2
          className={`${
            path === "/" ? "pointer-events-none" : "pointer-events-auto"
          } h-16 border-b flex items-center text-2xl font-extrabold text-primary pl-4`}
        >
          Codify
        </h2>
        {status === "loading" ? (
          <nav className="mx-4 mt-8 flex flex-col space-y-4">
            {NavLinks.map((navlink) => (
              <span
                key={navlink.label}
                className={`skeleton px-4 py-2 rounded`}
              >
                Skeleton
              </span>
            ))}
          </nav>
        ) : session?.user?.id ? (
          <nav className="mx-4 mt-4 flex flex-col space-y-2">
            {NavLinks.map(({ label, href, isPathMatch }) => (
              <LinkWithProgress
                key={label}
                href={href}
                onClick={() => setIsSideNavOpen(false)}
                className={`px-4 py-2 rounded ${
                  path === isPathMatch
                    ? "bg-primary text-white pointer-events-none"
                    : "hover:bg-slate-100"
                } transition-colors`}
              >
                {label}
              </LinkWithProgress>
            ))}
          </nav>
        ) : (
          <nav className="mx-4 mt-8">
            <LinkWithProgress
              href="/sign-in"
              className={`${
                path === "/sign-n" ? "pointer-events-none" : ""
              } px-4 py-2 rounded flex items-center text-xl border hover:bg-slate-100 transition-colors`}
            >
              <MdOutlineLogin className="mr-2" /> Sign in
            </LinkWithProgress>
          </nav>
        )}
      </div>
    </aside>
  );
}
