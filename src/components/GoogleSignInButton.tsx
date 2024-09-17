"use client";

import { useFormStatus } from "react-dom";

// 3rd party libraries
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton({ theme }: { theme: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button
          className={`border-2 border-[#e1e1e1] w-[250px] bg-white text-black h-[47.6px] flex items-center justify-center hover:bg-slate-100 mb-4 font-medium rounded-custom`}
        >
          <span className="loader text-[#3B82F6]"></span>
        </button>
      ) : (
        <button
          type="submit"
          className={`border-2 border-[#e1e1e1] w-[250px] bg-white text-black h-[47.6px] flex items-center justify-center hover:bg-slate-100 mb-4 font-medium rounded-custom`}
        >
          <FcGoogle className="mr-4 text-3xl" /> Sign in with Google
        </button>
      )}
    </>
  );
}
