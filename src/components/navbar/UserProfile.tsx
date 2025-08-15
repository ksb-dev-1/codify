"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";
import { useToggleLockScroll } from "@/hooks/useToggleLockScroll";

// components
import LinkWithProgress from "@/components/shared/LinkWithProgress";

// icons
import { signOut } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

interface UserProfileProps {
  image: string | null | undefined;
}

export default function UserProfile({ image }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isOnProfilePage = pathname === "/profile";

  useToggleLockScroll(isOpen);
  useHandleOutsideClick(profileRef, setIsOpen);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div ref={profileRef} className="user-profile-fixed relative">
      {image ? (
        <div className="relative h-8 w-8 rounded-full overflow-hidden border bg-white">
          <Image
            src={image}
            alt="User profile picture"
            fill
            priority
            sizes="32px"
            onClick={toggleMenu}
            className="rounded-full cursor-pointer object-cover"
          />
        </div>
      ) : (
        <button
          onClick={toggleMenu}
          className="relative w-8 h-8 rounded-full border shadow-md"
        >
          <FaRegUser className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>
      )}

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-2 origin-top-right bg-white dark:bg-dark border shadow-xl rounded transition-all w-max p-2 z-50 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <LinkWithProgress
          href="/profile"
          onClick={toggleMenu}
          className={`px-4 py-2 flex items-center rounded hover:bg-slate-100 transition-colors ${
            isOnProfilePage
              ? "text-primary pointer-events-none"
              : "pointer-events-auto"
          }`}
        >
          <FaRegUser />
          <span className="ml-3">Profile</span>
        </LinkWithProgress>

        <button
          onClick={() => {
            signOut();
            toggleMenu();
          }}
          className="px-4 py-2 flex items-center rounded hover:bg-slate-100 transition-colors w-full text-left"
        >
          <MdOutlineLogout />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
}
