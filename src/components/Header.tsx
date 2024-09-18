"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// hooks
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// components
import SideMenu from "./SideMenu";

// 3rd party libraries
import { useSession, signOut } from "next-auth/react";
import { PiUserCircleLight, PiBookmarkSimple, PiMoon } from "react-icons/pi";
import { CgSun } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { CiUser } from "react-icons/ci";

export default function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = searchParams.get("theme") || "light";
  const { data: session, status } = useSession();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sideMenuRef = useRef<HTMLDivElement>(null);

  let title = `Codify`;
  let linkContent: React.ReactNode;
  let authContent: React.ReactNode;

  //useHeaderScroll(headerRef);
  useHandleOutsideClick(dropdownRef, setIsDropdownOpen);

  // to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isSideMenuVisible) {
        setIsSideMenuVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Optional: Check on mount in case the component mounts with a larger screen
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isSideMenuVisible]);

  const toggleSideMenu = () => setIsSideMenuVisible((prev) => !prev);
  const closeSideMenu = () => setIsSideMenuVisible(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleTheme = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("theme", theme === "light" ? "dark" : "light");
    router.replace(currentUrl.toString());
  };

  if (status === "loading") {
    linkContent = (
      <div className="hidden sm:flex sm:items-center">
        <div
          className={`h-[40px] w-[100px]  ml-8 rounded-[50px] ${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          }`}
        ></div>
        <div
          className={`h-[40px] w-[100px]  ml-4 rounded-[50px] ${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          }`}
        ></div>
      </div>
    );
    authContent = (
      <div
        className={`h-[40px] w-[40px] rounded-full ${
          theme === "light" ? "skeleton-light" : "skeleton-dark"
        }`}
      ></div>
    );
  } else if (session?.user) {
    linkContent = (
      <div className="hidden sm:flex sm:items-center">
        <Link
          href={`/pages/questions?theme=${theme}&page=1`}
          className={`${
            theme === "light" ? "hover:bg-light" : "hover:bg-dark"
          } ml-8 px-4 py-2 rounded-[50px] font-medium`}
        >
          Questions
        </Link>
        <Link
          href={`/pages/payment?theme=${theme}`}
          className="ml-4 px-4 py-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white hover:from-yellow-500 hover:to-orange-500  rounded-[50px] font-medium"
        >
          Premium
        </Link>
      </div>
    );
    authContent = (
      <div className="relative" ref={dropdownRef}>
        {session.user.image ? (
          <Image
            src={session.user.image}
            width={40}
            height={40}
            alt="User avatar"
            className="rounded-full cursor-pointer hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          />
        ) : (
          <div
            className={`${
              theme === "light" ? "bg-light" : "bg-darker"
            } relative h-[40px] w-[40px] rounded-full cursor-pointer hover:shadow-[0_0_3px_rgba(195,195,195,0.75)]`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <CiUser className="text-2xl" />
            </span>
          </div>
        )}
        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-2 w-48 rounded-custom modal-shadow p-2 z-10 transition-transform origin-top-right border ${
            isDropdownOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          } ${
            theme === "light"
              ? "bg-lighter border-light"
              : "bg-darker border-dark"
          }`}
        >
          <Link
            href={`/pages/profile?theme=${theme}`}
            className={`${
              theme === "light" ? "hover:bg-light" : "hover:bg-dark"
            } flex items-center px-4 py-2 rounded-custom`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <PiUserCircleLight className="mr-2 text-xl" />
            My Profile
          </Link>
          <Link
            href={`/pages/bookmarks?theme=${theme}`}
            className={`${
              theme === "light" ? "hover:bg-light" : "hover:bg-dark"
            } flex items-center px-4 py-2 rounded-custom`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <PiBookmarkSimple className="mr-2 text-xl" />
            Bookmarks
          </Link>
          <Link
            href="#"
            className={`${
              theme === "light" ? "hover:bg-light" : "hover:bg-dark"
            } flex items-center px-4 py-2 rounded-custom`}
            onClick={() => {
              handleSignOut();
              setIsDropdownOpen((prev) => !prev);
            }}
          >
            <IoIosLogOut className="mr-2 text-xl" />
            Sign out
          </Link>
        </div>
      </div>
    );
  } else {
    linkContent = (
      <div className="hidden sm:flex sm:items-center">
        <Link
          href={`/pages/signin?theme=${theme}`}
          className={`${
            theme === "light" ? "hover:bg-light" : "hover:bg-dark"
          } ml-8 px-4 py-2 rounded-[50px] font-medium`}
        >
          Questions
        </Link>
        <Link
          href={`/pages/signin?theme=${theme}`}
          className="ml-4 px-4 py-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white hover:from-yellow-500 hover:to-orange-500 rounded-[50px] font-medium"
        >
          Premium
        </Link>
      </div>
    );
    authContent = (
      <Link
        href={`/pages/signin?theme=${theme}`}
        className="flex items-center justify-center bg-black text-white hover:bg-[#111] px-4 py-2 rounded-[50px]"
      >
        Sign in
      </Link>
    );
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`border-b ${
          theme === "light"
            ? "bg-lighter text-darker border-light"
            : "bg-darker text-lighter border-dark"
        } fixed top-0 left-0 z-20 w-full flex items-center justify-center`}
      >
        <div className="max-w-[1280px] w-full h-[4.5rem] px-4 flex items-center justify-between">
          <div className="flex items-center">
            <span
              onClick={toggleSideMenu}
              className="mr-4 sm:hidden text-2xl cursor-pointer"
            >
              <MdMenu />
            </span>
            <Link
              href={`/?theme=${theme}`}
              className="flex items-center font-extrabold text-2xl"
            >
              {title}
            </Link>
            {linkContent}
          </div>
          <div className="flex items-center">
            {theme === "light" ? (
              <div
                onClick={toggleTheme}
                className="hover:bg-light relative h-[40px] w-[40px] rounded-full mr-4 cursor-pointer"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block text-xl">
                  <PiMoon />
                </span>
              </div>
            ) : (
              <div
                onClick={toggleTheme}
                className="hover:bg-dark relative h-[40px] w-[40px] rounded-full mr-4 cursor-pointer"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block text-xl">
                  <CgSun />
                </span>
              </div>
            )}
            {authContent}
          </div>
        </div>
      </header>
      <SideMenu
        ref={sideMenuRef}
        isVisible={isSideMenuVisible}
        closeMenu={closeSideMenu}
      />
    </>
  );
}
