"use client";

import Link from "next/link";
import { RxGithubLogo } from "react-icons/rx";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full flex flex-col md:flex-row items-center justify-center py-4 px-6 shadow-md">
      <div className="max-w-[1280px] w-full flex flex-col md:flex-row items-center justify-between">
        {/* Branding */}
        <Link
          href="/"
          aria-label="home link"
          className="font-extrabold text-white text-2xl mb-4 md:mb-0 hover:text-yellow-300"
        >
          Codify
        </Link>

        {/* Social Media and Copyright */}
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <Link
            href="https://github.com"
            aria-label="github link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-3xl mb-2 hover:text-yellow-300"
          >
            <RxGithubLogo />
          </Link>
          <p className="hidden md:block text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Codify. All rights reserved.
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-right">
          <p className="text-white font-medium">John Doe</p>
          <p className="text-gray-400">johndoe@gmail.com</p>
          <p className="text-gray-400">+91 123456789</p>
        </div>

        <p className="block md:hidden text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} Codify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
