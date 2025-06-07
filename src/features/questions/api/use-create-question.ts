import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { Question } from "@/types/questions";
import { useParams } from "wouter";
import { useQuestionStore } from "@/store/questions.store";
import { toast } from "sonner";

type Response = {
  success: boolean;
  message: string;
};

export const useCreateQuestion = () => {
  const { surveyId } = useParams();
  const { resetApiQueuedQuestions } = useQuestionStore();
  const createQuestions = async (dto: Question[]): Promise<Response> => {
    const response = await api.post(`/surveys/${surveyId}/questions`, dto);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createQuestions,
    
    onSuccess: () => {
    
      resetApiQueuedQuestions();
      toast.success("Survey successfully updated");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    mutate,
    loading: isPending,
  };
};
