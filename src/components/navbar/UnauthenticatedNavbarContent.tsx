// components
import LinkWithProgress from "../shared/LinkWithProgress";

// 3rd party
import { MdOutlineLogin } from "react-icons/md";

export default function UnauthenticatedNavbarContent({
  path,
}: {
  path: string;
}) {
  return (
    <div className="h-16 flex items-center">
      <LinkWithProgress
        href="/sign-in"
        className={`${
          path === "/sign-in" ? "pointer-events-none" : ""
        } px-4 py-1 flex items-center justify-center rounded-full border hover:bg-slate-100 transition-colors`}
      >
        <MdOutlineLogin className="mr-2" /> Sign in
      </LinkWithProgress>
    </div>
  );
}
