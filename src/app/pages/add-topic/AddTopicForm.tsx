"use client";

import Link from "next/link";

// 3rd party libraries
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";

// Define the Zod schema
const topicSchema = z.object({
  name: z.string().min(1, "Topic name is required"),
});

// Define the type for the form data
type TopicFormData = z.infer<typeof topicSchema>;

// Create a mutation function to add a topic
const addTopic = async (newTopic: { name: string }) => {
  const response = await fetch("/api/topics/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTopic),
  });

  if (!response.ok) {
    throw new Error("Failed to add topic");
  }

  return response.json();
};

export default function AddTopicForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TopicFormData>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: addTopicMutation, isPending } = useMutation({
    mutationFn: addTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      toast.success("Topic added successfully!");
    },
    onError: () => {
      toast.error("Failed to add topic. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<TopicFormData> = async (data) => {
    addTopicMutation(data);
  };

  return (
    <div className="max-w-[750px] w-full my-[144px] px-4 md:p-0">
      <h1 className="mb-4 font-bold text-xl">Add Topic</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 sm:p-16 w-full bg-white space-y-4 rounded-custom border border-slate-300"
      >
        <div>
          <label htmlFor="name" className="block font-bold">
            New Topic
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`mt-2 block w-full border p-2 focus:outline-blue-300 rounded-custom ${
              errors.name ? "border-[3px] border-red-200" : "border-slate-300"
            }`}
            placeholder="Enter new topic"
          />
          {errors.name && (
            <p className="text-sm text-red-400 font-medium tracking-wide">
              {errors.name.message}
            </p>
          )}
        </div>
        <button
          type={isPending ? "button" : "submit"}
          className="w-full h-[40px] rounded-custom border flex items-center justify-center hover:bg-[#333] bg-black text-white"
        >
          {isPending ? <span className="loader"></span> : "Submit"}
        </button>

        <Link
          href="/pages/add-question"
          className="text-blue-500 flex items-center"
        >
          <IoMdArrowBack className="mt-[0.1rem] mr-1" />
          Go back to add question
        </Link>
      </form>
    </div>
  );
}
