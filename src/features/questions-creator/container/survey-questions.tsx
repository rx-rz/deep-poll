import { useQuestionStore } from "@/store/questions.store";

import { Link } from "wouter";
import { QuestionCreator } from "./question-creator";
import { useEffect } from "react";
import { useCreateQuestions } from "../api/use-create-questions";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetQuestions } from "../api/use-get-questions";

export const SurveyQuestions = () => {
  const { questions, setQuestions, updatedQuestions, resetUpdatedQuestions } =
    useQuestionStore();
  const { mutate: createOrUpdateQuestions } = useCreateQuestions();
  const { questions: apiQuestions } = useGetQuestions();

  const debouncedUpdatedQuestions = useDebounce(updatedQuestions, 5000);

  useEffect(() => {
    if (
      debouncedUpdatedQuestions &&
      Object.keys(debouncedUpdatedQuestions).length > 0
    ) {
      createOrUpdateQuestions(debouncedUpdatedQuestions);
      resetUpdatedQuestions();
    }
  }, [debouncedUpdatedQuestions]);

  useEffect(() => {
    setQuestions(apiQuestions ?? []);
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
