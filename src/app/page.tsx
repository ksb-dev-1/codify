// components
import StartButton from "@/components/StartButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-7xl p-[144px] px-4 sm:px-8 lg:px-16">
        <header className="flex flex-col items-center fade-in">
          <h3 className="text-2xl font-extrabold mb-4 slide-in">
            Welcome to Codify
          </h3>
          <p className="max-w-[500px] w-full text-center mb-8 slide-in">
            <span className="font-bold">Codify</span> is your go-to platform for
            mastering JavaScript. We make learning interactive and enjoyable,
            turning coding into a fun and rewarding experience.
          </p>
          <StartButton />
        </header>

        <section className="mt-10 fade-in">
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <h3 className="text-xl font-bold">Practice</h3>
              <p className="mt-2 text-gray-800">
                Engage in practice sessions with a wide range of questions
                across various topics, difficulty levels, and statuses to
                enhance your learning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <h3 className="text-xl font-bold">Interactive Navigation</h3>
              <p className="mt-2 text-gray-800">
                Easily move through pages with our intuitive navigation buttons,
                allowing you to quickly browse through questions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="mt-2 text-gray-800">
                Keep track of your progress over time by viewing your overall
                performance, as well as progress in easy, medium, and hard
                categories.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <h3 className="text-xl font-bold">Bookmark Questions</h3>
              <p className="mt-2 text-gray-800">
                Save tricky questions to revisit later and deepen your
                understanding. You can remove them when they are no longer
                needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <h3 className="text-xl font-bold">Instant Feedback</h3>
              <p className="mt-2 text-gray-800">
                After choosing the correct option, view a detailed explanation
                for each question and mark questions as checked or unchecked.
              </p>
            </div>

            <div className="bg-gradient-to-tr from-orange-500 to-yellow-500 text-white p-6 rounded-xl">
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
