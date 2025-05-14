import { api } from "@/lib/axios";
import { Question } from "@/types/questions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";

type Response = {
  data: {
    response: {
      id: string;
      surveyId: string;
      answers: {
        questionId: string | null;
        answerText: string | null;
        answerNumber: number | null;
        answerJson: any | null;
        id: string;
        createdAt: Date;
        responseId: string | null;
        question: Question;
      }[];
      submittedAt: Date;
      account: {
        user: {
          email: string | null;
        };
      };
    };
  };
};
export const useGetResponse = () => {
  const { responseId } = useParams();
  const getResponse = async (): Promise<Response> => {
    const response = await api.get(`/responses/${responseId}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: getResponse,
    queryKey: [`response`, responseId],
    enabled: !!responseId,
  });

  return {
    response: data?.data.response,
    questions: data?.data.response.answers.map((answer) => answer.question),
    answers: data?.data.response.answers.map((answer) => answer),
    error,
    loading: isLoading,
  };
};
