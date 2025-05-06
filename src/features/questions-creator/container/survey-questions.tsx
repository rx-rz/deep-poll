import { useQuestionStore } from "@/store/questions.store";

import { QuestionCreator } from "./question-creator";
import { useEffect } from "react";
import { useGetQuestions } from "../api/use-get-questions";

export const SurveyQuestions = () => {
  const { questions, setQuestions } = useQuestionStore();
  const { questions: apiQuestions } = useGetQuestions();

  useEffect(() => {
    setQuestions(apiQuestions ?? []);
  }, [apiQuestions]);

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      <div className="w-fit  flex flex-col gap-3">
        {questions &&
          questions.map((question) => (
            <QuestionCreator question={question} key={question.id} />
          ))}
      </div>
    </div>
  );
};
