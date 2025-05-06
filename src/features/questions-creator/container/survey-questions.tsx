import { useQuestionStore } from "@/store/questions.store";

import { Link } from "wouter";
import { QuestionCreator } from "./question-creator";
import { useEffect } from "react";
import { useCreateQuestions } from "../api/use-create-questions";
import { useGetQuestions } from "../api/use-get-questions";

export const SurveyQuestions = () => {
  const { questions, setQuestions, updatedQuestions } = useQuestionStore();
  const { mutate: createOrUpdateQuestions } = useCreateQuestions();
  const { questions: apiQuestions } = useGetQuestions();

  useEffect(() => {
    if (updatedQuestions && Object.keys(updatedQuestions).length > 0) {
      createOrUpdateQuestions(updatedQuestions);
    }
  }, [updatedQuestions]);

  useEffect(() => {
    const merged = [...(apiQuestions ?? [])].map(
      (q) => updatedQuestions?.find((u) => u.id === q.id) ?? q
    );
    const newQuestions = [
      ...merged,
      ...(updatedQuestions?.filter(
        (u) => !apiQuestions?.some((q) => q.id === u.id)
      ) ?? []),
    ];
    setQuestions(newQuestions);
  }, [apiQuestions]);
  
  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      <Link to="/answer">Answers</Link>
      <div className="w-fit  flex flex-col gap-3">
        {questions &&
          questions.map((question) => (
            <QuestionCreator question={question} key={question.id} />
          ))}
      </div>
    </div>
  );
};
