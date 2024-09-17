import React, { forwardRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// 3rd party libraries
import { useSession } from "next-auth/react";
import { IoMdClose } from "react-icons/io";

interface SideMenuProps {
  isVisible: boolean;
  closeMenu: () => void;
}

const SideMenu = forwardRef<HTMLDivElement, SideMenuProps>(
  ({ isVisible, closeMenu }, ref) => {
    const searchParams = useSearchParams();
    const theme = searchParams.get("theme") || "light";
    const { data: session, status } = useSession();
    let linkContent: React.ReactNode;

    if (status === "loading") {
      linkContent = (
        <>
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
        </>
      );
    } else if (session?.user) {
      linkContent = (
        <>
          <Link
            onClick={closeMenu}
            href={`/pages/questions?theme=${theme}&page=1`}
            className={`${
              theme === "light" ? "hover:bg-[#f1f5f9]" : "hover:bg-[#1a1a1a]"
            } px-4 py-2 rounded-xl mb-2 font-medium text-sm`}
          >
            QUESTIONS
          </Link>
          <Link
            onClick={closeMenu}
            href={`/pages/payment?theme=${theme}`}
            className="px-4 py-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white hover:from-yellow-500 hover:to-orange-500 rounded-xl mb-2 font-medium text-sm"
          >
            PREMIUM
          </Link>
        </>
      );
    } else {
      linkContent = (
        <>
          <Link
            onClick={closeMenu}
            href={`/pages/questions?theme=${theme}&page=1`}
            className={`${
              theme === "light" ? "hover:bg-[#f1f5f9]" : "hover:bg-[#1a1a1a]"
            } px-4 py-2 rounded-xl mb-2 font-medium text-sm`}
          >
            QUESTIONS
          </Link>
          <Link
            onClick={closeMenu}
            href={`/pages/payment?theme=${theme}`}
            className="px-4 py-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white hover:from-yellow-500 hover:to-orange-500 rounded-xl mb-2 font-medium text-sm"
          >
            PREMIUM
          </Link>
        </>
      );
    }

    return (
      <div
        ref={ref}
        className={`${
          theme === "light"
            ? "bg-[rgba(241,245,249,0.95)]"
            : "bg-[rgba(26,26,26,0.95)]"
        } sm:hidden fixed z-50 top-0 left-0 right-0 bottom-0 transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`${
            theme === "light" ? "lightBg1 darkColor2" : "darkBg1 lightColor1"
          } p-8 h-full w-[250px]`}
        >
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
