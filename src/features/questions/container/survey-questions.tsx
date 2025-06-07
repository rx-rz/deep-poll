import { useQuestionStore } from "@/store/questions.store";

import { QuestionCreator } from "./question-creator";
import { useEffect } from "react";
import { useGetQuestions } from "../api/use-get-questions";
import { useDebounce } from "@/hooks/use-debounce";
import { useCreateQuestion } from "../api/use-create-question";
import { toast } from "sonner";

export const SurveyQuestions = () => {
  const {
    questions,
    setQuestions,
    apiQueuedQuestions,
    resetApiQueuedQuestions,
  } = useQuestionStore();
  const { questions: apiQuestions } = useGetQuestions();

  const { mutate } = useCreateQuestion();
  const debouncedApiQueuedQuestions = useDebounce(apiQueuedQuestions, 500);

  useEffect(() => {
    setQuestions(apiQuestions ?? []);
  }, [apiQuestions]);

  useEffect(() => {
    if (debouncedApiQueuedQuestions && debouncedApiQueuedQuestions.length > 0) {
      const loadingToast = toast.loading("Saving changes...");
      mutate(debouncedApiQueuedQuestions, {
        onSuccess: () => {
          resetApiQueuedQuestions();
          toast.dismiss(loadingToast);
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
              <QuestionCreator question={question} key={i} index={i} />
            </div>
          ))}
      </div>
    </div>
  );
};
