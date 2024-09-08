"use client";

import { useFormStatus } from "react-dom";

// 3rd party libraries
import { FaGithub } from "react-icons/fa";

export default function GitHubSignInButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button className="w-[250px] h-[47.6px] border border-black flex items-center justify-center hover:bg-[#333] bg-black text-white rounded-xl">
          <span className="loader"></span>
        </button>
      ) : (
        <button
          type="submit"
          className="w-[250px] h-[47.6px] border border-black flex items-center justify-center hover:bg-[#333] bg-black text-white rounded-xl"
        >
          <FaGithub className="mr-4 text-3xl" /> Sign in with GitHub
        </button>
      )}
    </>
  );
}
