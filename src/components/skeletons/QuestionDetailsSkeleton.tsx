export default function QuestionDetailsSkeleton() {
  return (
    <div className="border rounded p-4 md:p-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="skeleton rounded">Back to questions</div>
        <div className="flex items-center gap-4">
          <span className="skeleton rounded w-24">Status</span>
          <span className="skeleton rounded w-24">Difficulty</span>
          <span className="skeleton rounded-full h-8 w-8 inline-block" />
        </div>
      </div>

      <div className="mt-8">
        <p className="skeleton rounded w-fit font-bold text-lg">Topic Name</p>
        <p className="skeleton rounded mt-2 w-fit">
          What is the output of following code?
        </p>
      </div>

      <div className="skeleton rounded mt-4 h-56">Code Snippet</div>

      <div className="mt-4 border-t py-4 grid md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((el, index) => {
          return (
            <button
              key={index}
              type="button"
              className="skeleton rounded px-4 py-2"
            >
              Option
            </button>
          );
        })}
      </div>
      <button className="skeleton rounded w-full px-4 py-2">Submit</button>
    </div>
  );
}
