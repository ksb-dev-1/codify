"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

// 3rd party libraries
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

  //console.log(session?.user?.id);

  return (
    <div
      className={`${
        theme === "light" ? "bg-lighter text-dark" : "bg-darker text-lighter"
      } min-h-screen flex flex-col items-center justify-center`}
    >
      <div className="max-w-7xl p-[144px] px-4 sm:px-8 lg:px-16">
        <header className="flex flex-col items-center fade-in">
          <h3 className="text-2xl font-bold mb-4 slide-in">
            Welcome to Codify
          </h3>
          <p className="max-w-[500px] w-full text-center mb-8 slide-in">
            <span className="font-bold">Codify</span> is your go-to platform for
            mastering JavaScript. We make learning interactive and enjoyable,
            turning coding into a fun and rewarding experience.
          </p>
          {!session?.user?.id ? (
            <Link
              href={`/pages/signin?theme=${theme}`}
              className={`${
                theme === "light"
                  ? "bg-dark text-lighter hover:bg-darker"
                  : "bg-lighter text-darker hover:bg-light"
              }  rounded-[50px] px-8 py-4`}
            >
              Start Learning
            </Link>
          ) : (
            <Link
              href={`/pages/questions?theme=${theme}&page=1`}
              className={`${
                theme === "light"
                  ? "bg-dark text-lighter hover:bg-darker"
                  : "bg-lighter text-darker hover:bg-light"
              }  rounded-[50px] px-8 py-4`}
            >
              Start Learning
            </Link>
          )}
        </header>

        <section className="mt-10 fade-in">
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div
              className={`${
                theme === "light" ? "border-light" : "border-dark"
              } border p-6 rounded-custom`}
            >
              <h3 className="text-xl font-bold">Practice</h3>
              <p className="mt-2">
                Engage in practice sessions with a wide range of questions
                across various topics, difficulty levels, and statuses to
                enhance your learning.
              </p>
            </div>

            <div
              className={`${
                theme === "light" ? "border-light" : "border-dark"
              } border p-6 rounded-custom`}
            >
              <h3 className="text-xl font-bold">Interactive Navigation</h3>
              <p className="mt-2">
                Easily move through pages with our intuitive navigation buttons,
                allowing you to quickly browse through questions.
              </p>
            </div>

            <div
              className={`${
                theme === "light" ? "border-light" : "border-dark"
              } border p-6 rounded-custom`}
            >
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="mt-2">
                Keep track of your progress over time by viewing your overall
                performance, as well as progress in easy, medium, and hard
                categories.
              </p>
            </div>

            <div
              className={`${
                theme === "light" ? "border-light" : "border-dark"
              } border p-6 rounded-custom`}
            >
              <h3 className="text-xl font-bold">Bookmark Questions</h3>
              <p className="mt-2">
                Save tricky questions to revisit later and deepen your
                understanding. You can remove them when they are no longer
                needed.
              </p>
            </div>

            <div
              className={`${
                theme === "light" ? "border-light" : "border-dark"
              } border p-6 rounded-custom`}
            >
              <h3 className="text-xl font-bold">Instant Feedback</h3>
              <p className="mt-2">
                After choosing the correct option, view a detailed explanation
                for each question and mark questions as checked or unchecked.
              </p>
            </div>

            <div
              className={`${
                theme === "light" ? "border-light" : "border-dark"
              } border p-6 rounded-custom`}
            >
              <h3 className="text-xl font-bold">Premium Access</h3>
              <p className="mt-2">
                Unlock exclusive access by upgrading to premium.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
