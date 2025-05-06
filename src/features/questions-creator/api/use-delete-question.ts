import { api } from "@/lib/axios";
import { handleAPIErrors } from "@/lib/errors";
import { useQuestionStore } from "@/store/questions.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "wouter";

export const useDeleteQuestion = () => {
  const { surveyId } = useParams();
  const deleteQuestionInStore = useQuestionStore(
    (state) => state.removeQuestion
  );
  const deleteQuestion = async (id: string) => {
    const response = await api.delete(`/surveys/${surveyId}/questions/${id}`);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDeleteQuestion = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("Question deleted successfully");
        deleteQuestionInStore(id);
      },
      onError: (error) => handleAPIErrors(error),
    });
    deleteQuestionInStore(id);
  };

  return {
    handleDeleteQuestion,
    loading: isPending,
  };
};
