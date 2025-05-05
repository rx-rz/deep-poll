import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { Question } from "@/types/questions";
import { useParams } from "wouter";

type Response = {
  success: boolean;
  message: string;
};

export const useCreateQuestions = () => {
  const {surveyId} = useParams()
  const createQuestions = async (
    dto: Question[]
  ): Promise<Response> => {
    const response = await api.post(`/surveys/${surveyId}/questions`, dto);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createQuestions,
    onSuccess: () => {
      location.reload();
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
