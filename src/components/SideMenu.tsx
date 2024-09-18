import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
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
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    let linkContent: React.ReactNode;

    useImperativeHandle(ref, () => outerRef.current as HTMLDivElement);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          outerRef.current &&
          outerRef.current.contains(event.target as Node) &&
          innerRef.current &&
          !innerRef.current.contains(event.target as Node)
        ) {
          closeMenu();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [closeMenu]);

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
              theme === "light" ? "hover:bg-light" : "hover:bg-dark"
            } px-4 py-2 rounded-xl mb-2 font-medium`}
          >
            Questions
          </Link>
          <Link
            onClick={closeMenu}
            href={`/pages/payment?theme=${theme}`}
            className="px-4 py-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white hover:from-yellow-500 hover:to-orange-500 rounded-xl mb-2 font-medium"
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
            href={`/pages/signin?theme=${theme}`}
            className={`${
              theme === "light" ? "hover:bg-light" : "hover:bg-dark"
            } px-4 py-2 rounded-xl mb-2 font-medium`}
          >
            Questions
          </Link>
          <Link
            onClick={closeMenu}
            href={`/pages/signin?theme=${theme}`}
            className="px-4 py-2 bg-gradient-to-tr from-orange-500 to-yellow-500 text-white hover:from-yellow-500 hover:to-orange-500 rounded-xl mb-2 font-medium"
          >
            Premium
          </Link>
        </>
      );
    }

    return (
      <div
        ref={outerRef}
        className={`${
          theme === "light"
            ? "bg-[rgba(241,245,249,0.5)]"
            : "bg-[rgba(40,40,40,0.5)]"
        } sm:hidden fixed z-50 top-0 left-0 right-0 bottom-0 transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          ref={innerRef}
          className={`${
            theme === "light"
              ? "bg-lighter text-darker"
              : "bg-darker text-lighter"
          } p-8 h-full w-[250px] shadow-2xl`}
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
        {/* <div
          onClick={closeMenu}
          className="absolute h-[40px] w-[40px] bg-red-500 rounded-full right-8 top-8 cursor-pointer hover:bg-red-400"
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IoMdClose className="text-xl text-white" />
          </span>
        </div> */}
      </div>
    );
  }
);

SideMenu.displayName = "SideMenu";
export default SideMenu;
