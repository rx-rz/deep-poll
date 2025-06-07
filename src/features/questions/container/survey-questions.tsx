import { useQuestionStore } from "@/store/questions.store";

import { QuestionCreator } from "./question-creator";
import { useEffect } from "react";
import { useGetQuestions } from "../api/use-get-questions";
import { useDebounce } from "@/hooks/use-debounce";
import { useCreateQuestion } from "../api/use-create-question";

export const SurveyQuestions = () => {
  const {
    questions,
    setQuestions,
    apiQueuedQuestions,
    resetApiQueuedQuestions,
  } = useQuestionStore();
  const { questions: apiQuestions } = useGetQuestions();

  const { mutate } = useCreateQuestion();
  const debouncedApiQueuedQuestions = useDebounce(apiQueuedQuestions, 3000);

  useEffect(() => {
    setQuestions(apiQuestions ?? []);
  }, [apiQuestions]);

  useEffect(() => {
    if (apiQueuedQuestions && apiQueuedQuestions.length > 0) {
      mutate(apiQueuedQuestions, {
        onSuccess: () => {
          resetApiQueuedQuestions();
        },
      });
    }
  }, [debouncedApiQueuedQuestions]);

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      <div className="w-fit  flex flex-col gap-3">
        {questions &&
          questions.map((question, i) => (
            <div className="my-2">
              <QuestionCreator
                question={question}
                key={question.id}
                index={i}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
