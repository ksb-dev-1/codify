// 3rd party
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border border-t min-h-16 flex items-center justify-center">
      <div className="max-w-6xl w-full h-full flex flex-col sm:flex-row items-center sm:justify-between px-6 sm:px-8 md:px-16 py-4 border-x">
        <span className="text-center sm:text-left text-sm">
          © {new Date().getFullYear()} Codify. All rights reserved.
        </span>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <a
            href="mailto:babaleshwarkedar@gmail.com"
            className="hover:text-primary transition-colors underline"
          >
            babaleshwarkedar@gmail.com
          </a>

          <span aria-hidden="true">|</span>

          <a
            href="https://github.com/ksb-dev-1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Visit Codify on GitHub"
          >
            <FaGithub className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
