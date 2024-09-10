import React, { forwardRef, RefObject } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IoMdClose } from "react-icons/io";

interface SideMenuProps {
  isVisible: boolean;
  closeMenu: () => void;
}

const SideMenu = forwardRef<HTMLDivElement, SideMenuProps>(
  ({ isVisible, closeMenu }, ref) => {
    const { data: session, status } = useSession();
    let linkContent: React.ReactNode;

    if (status === "loading") {
      linkContent = (
        <>
          <div className="h-[40px] w-[80px] skeleton rounded-xl mb-2"></div>
          <div className="h-[40px] w-[80px] skeleton rounded-xl mb-2"></div>
          <div className="h-[40px] w-[80px] skeleton rounded-xl mb-2"></div>
        </>
      );
    } else if (session?.user) {
      linkContent = (
        <>
          <Link
            onClick={closeMenu}
            href={`/pages/learn?page=1`}
            className="px-4 py-2 hover:bg-slate-100 rounded-xl mb-2"
          >
            Learn
          </Link>
          <Link
            onClick={closeMenu}
            href="/pages/add-question"
            className="px-4 py-2 hover:bg-slate-100 rounded-xl mb-2"
          >
            Add
          </Link>
          <Link
            onClick={closeMenu}
            href="/pages/payment"
            className="px-4 py-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white hover:bg-slate-100 rounded-xl mb-2"
          >
            Premium
          </Link>
        </>
      );
    } else {
      linkContent = (
        <>
          <Link
            onClick={closeMenu}
            href="/pages/signin"
            className="px-4 py-2 hover:bg-slate-100 rounded-xl mb-2"
          >
            Learn
          </Link>
          <Link
            onClick={closeMenu}
            href="/pages/signin"
            className="px-4 py-2 hover:bg-slate-100 rounded-xl mb-2"
          >
            Add
          </Link>
          <Link
            onClick={closeMenu}
            href="/pages/signin"
            className="px-4 py-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white hover:bg-slate-100 rounded-xl mb-2"
          >
            Premium
          </Link>
        </>
      );
    }

    return (
      <div
        ref={ref}
        className={`sm:hidden fixed z-50 top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,0.95)] transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-white p-8 h-full w-[250px] shadow-md">
          <Link
            onClick={closeMenu}
            href="/"
            className="font-extrabold text-2xl"
          >
            Codify
          </Link>
          <div className="my-4 border-b border-slate-300"></div>
          <div className="flex flex-col">{linkContent}</div>
        </div>
        <div
          onClick={closeMenu}
          className="absolute h-[40px] w-[40px] bg-red-500 rounded-full right-8 top-8 cursor-pointer hover:bg-red-400"
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IoMdClose className="text-xl text-white" />
          </span>
        </div>
      </div>
    );
  }
);

SideMenu.displayName = "SideMenu";
export default SideMenu;
