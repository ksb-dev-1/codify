"use client";

import { useFormStatus } from "react-dom";

// 3rd party libraries
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button className="w-[250px] bg-white h-[47.6px] border border-[#cfcfcf] flex items-center justify-center hover:bg-slate-100 mb-4 font-medium rounded-xl">
          <span className="loader text-[#3B82F6]"></span>
        </button>
      ) : (
        <button
          type="submit"
          className="w-[250px] bg-white h-[47.6px] border border-[#cfcfcf] flex items-center justify-center hover:bg-slate-100 mb-4 font-medium rounded-xl"
        >
          <FcGoogle className="mr-4 text-3xl" /> Sign in with Google
        </button>
      )}
    </>
  );
}
