// components
import Container from "@/components/shared/Container";

// 3rd party
import { FaRegCircleQuestion } from "react-icons/fa6";
import { BiNavigation } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import { RiProgress5Line } from "react-icons/ri";
import { HiOutlineHeart } from "react-icons/hi";
import { MdOutlineFeedback } from "react-icons/md";

const cards = [
  {
    id: 1,
    heading: "Practice",
    content:
      "Engage in practice sessions with a wide range of questions across various topics, difficulty levels, and statuses to enhance your learning.",
    icon: (
      <FaRegCircleQuestion className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5" />
    ),
  },
  {
    id: 2,
    heading: "Interactive Navigation",
    content:
      "Easily move through pages with our intuitive navigation buttons, allowing you to quickly browse through questions.",
    icon: (
      <BiNavigation className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5" />
    ),
  },
  {
    id: 3,
    heading: "Filter Questions",
    content:
      "Filter questions based on concepts, tags (Easy, Medium, Complete) and progress (Todo, Started, Completed).",
    icon: (
      <IoFilter className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5" />
    ),
  },
  {
    id: 4,
    heading: "Progress Tracking",
    content:
      " Keep track of your progress over time by viewing your overall performance, as well as progress in easy, medium, and hard categories.",
    icon: (
      <RiProgress5Line className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5" />
    ),
  },
  {
    id: 5,
    heading: "Save Questions",
    content:
      " Save tricky questions to revisit later and deepen your understanding. You can remove them when they are no longer needed.",
    icon: (
      <HiOutlineHeart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5" />
    ),
  },
  {
    id: 6,
    heading: "Instant Feedback",
    content:
      " After choosing the correct option and marking the question as solved, you&apos;ll get a detailed explanation for the question.",
    icon: (
      <MdOutlineFeedback className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5" />
    ),
  },
];

function Card({
  heading,
  content,
  icon,
}: {
  heading: string;
  content: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative border rounded p-8 bg-white h-full">
      <h2 className="font-bold text-xl mb-4">{heading}</h2>
      <p className="text-[#666]">{content}</p>
      <div className="absolute h-10 w-10 top-0 right-0 bg-primary_light text-primary rounded-tr rounded-bl">
        {icon}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <Container className="border px-6 sm:px-8 md:px-16 py-8 md:py-16">
      <h2 className="text-xl md:text-2xl font-bold mb-8">
        <span
          className="inline-block border-b border-primary text-primary"
          style={{ display: "inline-block" }}
        >
          Features
        </span>
      </h2>

      <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
        {cards.map((card) => (
          <Card
            key={card.id}
            heading={card.heading}
            content={card.content}
            icon={card.icon}
          />
        ))}
      </div>
    </Container>
  );
}
