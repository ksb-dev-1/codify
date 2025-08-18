"use client";

import { useState } from "react";

// 3rd party
import { LiaPlusSolid, LiaMinusSolid } from "react-icons/lia";
import Container from "@/components/shared/Container";

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const faqs: FAQ[] = [
  {
    question: "What is Codify?",
    answer:
      "Codify is a JavaScript coding MCQ platform that helps users practice interview-style questions. It supports filtering, tracking, and categorization by topic and difficulty.",
  },
  {
    question: "Who can access premium questions?",
    answer:
      "Only premium users can access exclusive premium-level questions designed to closely mimic real coding interviews.",
  },
  {
    question: "How can I filter or search questions?",
    answer:
      "You can filter questions by topic, difficulty, and status (solved/unsolved/bookmarked). There's also a search option by title or keyword.",
  },
  {
    question: "Can I save questions to review later?",
    answer:
      "Yes, simply click the bookmark icon on a question to save it. You can access saved questions anytime from your dashboard.",
  },
  {
    question: "How is my progress tracked?",
    answer:
      "Codify automatically tracks your progress—questions solved, attempted, or not attempted. You can view stats and visual insights in your profile dashboard.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div>
      <div className="flex w-full items-center justify-between py-4 text-left">
        <button
          className="flex w-full items-center justify-between hover:underline"
          onClick={onToggle}
        >
          <h3 className="text-left font-semibold">{faq.question}</h3>
          <span className="ml-6 flex-shrink-0">
            {isOpen ? (
              <LiaMinusSolid className="h-5 w-5 text-primary" />
            ) : (
              <LiaPlusSolid className="h-5 w-5 text-primary" />
            )}
          </span>
        </button>
      </div>

      {isOpen && (
        <div key="answer">
          <p className="pb-4 text-[#666]">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container className="border-x px-6 sm:px-8 md:px-16 py-8 md:py-16">
      <h2 className="text-xl md:text-2xl font-bold mb-8">
        <span
          className="inline-block border-b border-primary text-primary"
          style={{ display: "inline-block" }}
        >
          FAQ&apos;s
        </span>
      </h2>

      <div className="divide-y divide-borderColor">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
            index={index}
          />
        ))}
      </div>
    </Container>
  );
}
