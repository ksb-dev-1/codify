// "use client";

const topics = [
  {
    label: "Closures",
    className: "top-32 left-10 rotate-[8deg]",
  },
  {
    label: "Hoisting",
    className: "top-24 right-16 -rotate-[5deg]",
  },
  {
    label: "OOP",
    className: "top-[30%] left-[20%] rotate-2",
  },
  {
    label: "Scopes",
    className: "top-[20%] right-[30%] -rotate-3",
  },
  {
    label: "this keyword",
    className: "top-[35%] right-10 rotate-[12deg]",
  },
  {
    label: "Callbacks",
    className: "bottom-[30%] left-20 -rotate-[15deg]",
  },
  {
    label: "Arrays",
    className: "bottom-[25%] right-[25%] -rotate-[6deg]",
  },
  {
    label: "AJAX",
    className: "bottom-[15%] left-[30%] rotate-[10deg]",
  },
  {
    label: "Event Loop",
    className: "bottom-20 right-10 -rotate-[8deg]",
  },
];

export default function TopicsCloud() {
  return (
    <div className="absolute min-h-screen w-full">
      {topics.map((topic) => (
        <span
          key={topic.label}
          className={`absolute px-4 py-2 rounded bg-indigo-50 shadow-md ${topic.className} text-primary sm:text-xl`}
        >
          {topic.label}
        </span>
      ))}
    </div>
  );
}
