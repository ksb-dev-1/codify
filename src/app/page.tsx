// components
import Container from "@/components/shared/Container";
import LinkWithProgress from "@/components/shared/LinkWithProgress";
import TopicsCloud from "@/components/home/TopicsCloud";
import Features from "@/components/home/Features";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <main>
      <Container className="relative flex items-center justify-center min-h-screen border-x px-6 sm:px-8 md:px-16 py-8 md:py-16">
        <TopicsCloud />

        <div
          className="absolute left-0 min-h-screen w-full flex flex-col items-center justify-center px-4 space-y-4 sm:space-y-6 bg-[rgba(255,255,255,0.65)]"
          role="region"
          aria-label="Welcome message and start learning button"
        >
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-primary">
            Welcome to Codify
          </h1>

          <p className="text-xl sm:text-2xl text-primary text-center font-semibold">
            Your go-to platform for mastering JavaScript through MCQs
          </p>

          <LinkWithProgress
            href="/questions?page=1"
            className="px-6 py-3 text-xl bg-primary text-white rounded-full hover:tracking-widest transition-all font-normal"
            role="button"
            aria-label="Start learning JavaScript through questions"
          >
            Start Learning
          </LinkWithProgress>
        </div>
      </Container>

      <section aria-labelledby="features-heading">
        <Features />
      </section>

      <section aria-labelledby="faq-heading">
        <FAQ />
      </section>
    </main>
  );
}
