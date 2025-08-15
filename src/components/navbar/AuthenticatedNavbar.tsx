import LinkWithProgress from "../shared/LinkWithProgress";

// utils
import { NavLinks } from "@/utils/constants";

// components
import UserProfile from "./UserProfile";

export default function AuthenticatedNavbarContent({
  path,
  image,
}: {
  path: string;
  image: string | null | undefined;
}) {
  return (
    <>
      <div className="hidden md:flex items-center border-x">
        {NavLinks.map(({ label, href, isPathMatch }) => (
          <LinkWithProgress
            key={label}
            href={href}
            className={`w-28 h-16 flex items-center justify-center transition-colors ${
              label === "Saved" ? "border-x" : ""
            } ${
              path === isPathMatch
                ? "bg-primary_light text-primary pointer-events-none"
                : "hover:bg-slate-100"
            }`}
          >
            {label}
          </LinkWithProgress>
        ))}
      </div>
      <UserProfile image={image} />
    </>
  );
}
