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
                Engage in practice sessions with a wide range of questions based
                on various topics to enhance your learning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <h3 className="text-xl font-bold">Interactive Navigation</h3>
              <p className="mt-2 text-gray-800">
                Easily move through questions with our intuitive navigation
                buttons, allowing you to review and change your answers before
                submitting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="mt-2 text-gray-800">
                Keep track of your scores and progress over time, and strive to
                beat your personal best.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <h3 className="text-xl font-bold">Bookmark Questions</h3>
              <p className="mt-2 text-gray-800">
                Save tricky questions to revisit later and deepen your
                understanding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <h3 className="text-xl font-bold">Interactive Quizzes</h3>
              <p className="mt-2 text-gray-800">
                Test your skills with our engaging quizzes that challenge your
                knowledge and provide instant feedback.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <h3 className="text-xl font-bold">Instant Feedback</h3>
              <p className="mt-2 text-gray-800">
                After completing the quiz, get a detailed breakdown of your
                score, see which answers you got right or wrong, and read
                explanations for each question.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
