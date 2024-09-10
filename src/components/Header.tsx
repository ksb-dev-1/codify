"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// hooks
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// components
import SideMenu from "./SideMenu";

// 3rd party libraries
import { useSession, signOut } from "next-auth/react";
import { PiUserCircleLight, PiBookmarkSimple } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { MdMenu } from "react-icons/md";

export default function Header() {
  const { data: session, status } = useSession();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sideMenuRef = useRef<HTMLDivElement>(null);

  let title = `Codify`;
  let linkContent: React.ReactNode;
  let authContent: React.ReactNode;

  useHeaderScroll(headerRef);
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

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleSideMenu = () => setIsSideMenuVisible((prev) => !prev);
  const closeSideMenu = () => setIsSideMenuVisible(false);

  if (status === "loading") {
    linkContent = (
      <div className="hidden sm:flex sm:items-center">
        <div className="h-[40px] w-[80px] skeleton ml-8 rounded-[50px]"></div>
        <div className="h-[40px] w-[80px] skeleton ml-4 rounded-[50px]"></div>
        <div className="h-[40px] w-[80px] skeleton ml-4 rounded-[50px]"></div>
      </div>
    );
    authContent = (
      <div className="h-[40px] w-[40px] rounded-full skeleton"></div>
    );
  } else if (session?.user) {
    linkContent = (
      <div className="hidden sm:flex sm:items-center">
        <Link
          href={`/pages/learn?page=1`}
          className="ml-8 px-4 py-2 hover:bg-slate-100 rounded-[50px]"
        >
          Learn
        </Link>
        <Link
          href="/pages/add-question"
          className="ml-4 px-4 py-2 hover:bg-slate-100 rounded-[50px]"
        >
          Add
        </Link>
        <Link
          href="/pages/payment"
          className="ml-4 px-4 py-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white hover:from-yellow-500 hover:to-orange-500  rounded-[50px]"
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
            className="rounded-full cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          />
        ) : (
          <div
            className="relative h-[40px] w-[40px] rounded-full cursor-pointer bg-black text-white hover:bg-[#333]"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <PiUserCircleLight className="text-3xl" />
            </span>
          </div>
        )}
        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-2 w-48 bg-white border rounded-xl modal-shadow  p-2 z-10 transition-transform duration-150 ease-out transform origin-top-right ${
            isDropdownOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <Link
            href="/pages/profile"
            className="flex items-center px-4 py-2 hover:bg-slate-100 rounded-xl"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <PiUserCircleLight className="mr-2 text-xl" />
            My Profile
          </Link>
          <Link
            href="/pages/bookmarks"
            className="flex items-center px-4 py-2 hover:bg-slate-100 rounded-xl"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <PiBookmarkSimple className="mr-2 text-xl" />
            Bookmarks
          </Link>
          <Link
            href="#"
            className="flex items-center px-4 py-2 hover:bg-slate-100 rounded-xl"
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
          href="/pages/signin"
          className="ml-8 px-4 py-2 hover:bg-slate-100 rounded-[50px]"
        >
          Learn
        </Link>
        <Link
          href="/pages/signin"
          className="ml-4 px-4 py-2 hover:bg-slate-100 rounded-[50px]"
        >
          Add
        </Link>
        <Link
          href="/pages/signin"
          className="ml-4 px-4 py-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white hover:bg-slate-100 rounded-[50px]"
        >
          Premium
        </Link>
      </div>
    );
    authContent = (
      <Link
        href="/pages/signin"
        className="flex items-center justify-center bg-black text-white hover:bg-[#333] px-4 py-2 rounded-[50px]"
      >
        Sign in
      </Link>
    );
  }

  return (
    <>
      <header
        ref={headerRef}
        className="bg-white fixed top-0 left-0 z-20 w-full flex items-center justify-center border-b border-slate-300"
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
              href="/"
              className="flex items-center font-extrabold text-2xl"
            >
              {title}
            </Link>
            {linkContent}
          </div>
          {authContent}
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
