import { handleAPIErrors } from "@/lib/errors";
import { useQuestionStore } from "@/store/questions.store";
import { toast } from "sonner";

export const createQuestion = (
  values: any,
  question: any,
  mutate: any,
  form: any
) => {
  const loadingToast = toast.loading("Saving changes");
  const updateQuestion = useQuestionStore((state) => state.updateQuestion)
  
  mutate(
    {
      ...question,
      options: values.options,
      questionText: values.questionText,
    },
    {
      onSuccess: () => {
        toast.success("Survey updated successfully");
        updateQuestion(question.id, {
          questionText: values.questionText,
          options: values.options,
        });
      },
      onError: (error: unknown) => {
        handleAPIErrors(error);
      },
      onSettled: () => {
        toast.dismiss(loadingToast);
      },
    }
  );
  
  form.reset(values);
};

