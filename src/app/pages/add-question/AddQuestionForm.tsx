"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// Components
import Topics, { TopicRef } from "./Topics";
import CorrectOption, { CorrectOptionRef } from "./CorrectOption";
import Difficulty, { DifficultyRef } from "./Difficulty";

// Schemas
import {
  AddQuestionSchema,
  AddQuestionValues,
} from "@/schemas/AddQuestionSchema";

// 3rd party libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type OptionKeys = "a" | "b" | "c" | "d";

// Function to handle adding a question
const addQuestion = async (data: AddQuestionValues) => {
  const response = await fetch("/api/questions/question/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add question");
  }

  return response.json();
};

export default function AddQuestionForm() {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const topicsRef = useRef<TopicRef>(null);
  const correctOptionRef = useRef<CorrectOptionRef>(null);
  const difficultyRef = useRef<DifficultyRef>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<AddQuestionValues>({
    resolver: zodResolver(AddQuestionSchema),
    mode: "onChange",
  });

  const { mutate: handleAddQuestion, isPending } = useMutation({
    mutationFn: addQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question added successfully");
      reset();
      correctOptionRef.current?.resetCorrectOption();
      difficultyRef.current?.resetDifficulty();
      topicsRef.current?.resetTopic();
    },
    onError: (error) => {
      toast.error("Failed to add question. Please try again.");
      console.error("Error adding question:", error);
    },
  });

  const onSubmit = async (data: AddQuestionValues) => {
    handleAddQuestion(data);
  };

  return (
    <div className="max-w-[750px] w-full my-[144px] px-4 md:p-0">
      <h1 className="mb-4 font-bold text-xl">Add Question</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 sm:p-16 w-full space-y-4 rounded-xl border border-slate-300"
      >
        {/* Question */}
        <div className="flex flex-col">
          <label htmlFor="question" className="font-semibold">
            Question
          </label>
          <input
            type="text"
            id="question"
            {...register("question")}
            className={`mt-1 block w-full border p-2 focus:outline-blue-300 focus:placeholder-transparent rounded-xl ${
              errors.question
                ? "border-[3px] border-red-300"
                : "border-slate-300"
            }`}
            placeholder="Enter your question"
          />
          {errors.question && (
            <p className="text-sm text-red-500 tracking-wide">
              {errors.question.message}
            </p>
          )}
        </div>

        {/* Topics */}
        <Topics
          setValue={setValue}
          error={errors.topicId && errors.topicId.message}
          clearErrors={clearErrors}
          ref={topicsRef}
        />
        <Link href="/pages/add-topic" className="text-blue-500">
          Do you want to add new topic?
        </Link>

        {/* Code Snippet */}
        <div className="flex flex-col">
          <label htmlFor="codeSnippet" className="font-semibold">
            Code Snippet (Optional)
          </label>
          <textarea
            rows={3}
            id="codeSnippet"
            {...register("codeSnippet")}
            className={`mt-1 block w-full border p-2 focus:outline-blue-300 focus:placeholder-transparent rounded-xl ${
              errors.codeSnippet
                ? "border-[3px] border-red-300"
                : "border-slate-300"
            }`}
            placeholder="Enter your code snippet"
          />
          {errors.codeSnippet && (
            <p className="text-sm text-red-500">{errors.codeSnippet.message}</p>
          )}
        </div>

        {/* 4 Options */}
        <div className="flex flex-col space-y-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(["a", "b", "c", "d"] as OptionKeys[]).map((option) => (
              <div key={option} className="flex flex-col">
                <label htmlFor={`options.${option}`} className="font-semibold">
                  Option {option.toUpperCase()}
                </label>
                <input
                  type="text"
                  id={`options.${option}`}
                  {...register(`options.${option}` as `options.${OptionKeys}`)}
                  className={`mt-1 block w-full border p-2 focus:outline-blue-300 focus:placeholder-transparent rounded-xl ${
                    errors.options
                      ? "border-[3px] border-red-300"
                      : "border-slate-300"
                  }`}
                  placeholder={`Enter option ${option.toLocaleUpperCase()}`}
                />
                {errors.options?.[option] && (
                  <p className="text-sm text-red-500 tracking-wide">
                    {errors.options[option]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Correct Option */}
        <CorrectOption
          setValue={setValue}
          error={errors.correctOption && errors.correctOption.message}
          clearErrors={clearErrors}
          ref={correctOptionRef}
        />

        {/* Difficulty */}
        <Difficulty
          setValue={setValue}
          error={errors.difficulty && errors.difficulty.message}
          clearErrors={clearErrors}
          ref={difficultyRef}
        />

        {/* Explanation */}
        <div className="flex flex-col">
          <label htmlFor="explanation" className="font-semibold">
            Explanation (Optional)
          </label>
          <textarea
            rows={3}
            id="explanation"
            {...register("explanation")}
            className={`mt-1 block w-full border p-2 focus:outline-blue-300 focus:placeholder-transparent rounded-xl ${
              errors.explanation
                ? "border-[3px] border-red-300"
                : "border-slate-300"
            }`}
            placeholder="Enter an explanation"
          />
          {errors.explanation && (
            <p className="text-sm text-red-500">{errors.explanation.message}</p>
          )}
        </div>

        <div className="flex items-center">
          <p className="font-semibold">Premium</p>
          <p className="flex items-center ml-8">
            {isPremium ? (
              <span className="h-[20px] w-[20px] rounded-full bg-black inline-block"></span>
            ) : (
              <span
                onClick={() => {
                  setIsPremium(true);
                  setValue("isPremium", true);
                }}
                className="h-[20px] w-[20px] rounded-full border border-slate-300 inline-block"
              ></span>
            )}{" "}
            <span className="ml-2">Yes</span>
          </p>
          <p className="flex items-center ml-8">
            {!isPremium ? (
              <span className="h-[20px] w-[20px] rounded-full bg-black inline-block"></span>
            ) : (
              <span
                onClick={() => {
                  setIsPremium(false);
                  setValue("isPremium", false);
                }}
                className="h-[20px] w-[20px] rounded-full border border-slate-300 inline-block"
              ></span>
            )}{" "}
            <span className="ml-2">No</span>
          </p>
        </div>

        <button
          type={isPending ? "button" : "submit"}
          className="w-full h-[40px] rounded-xl border flex items-center justify-center hover:bg-[#333] bg-black text-white"
        >
          {isPending ? <span className="loader"></span> : "Submit"}
        </button>
      </form>
    </div>
  );
}
