import { api } from "@/lib/axios";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";

type Response = {
  success: boolean;
  message: string;
  data: {
    questions: Question[];
  };
};

export const useGetQuestions = () => {
  const { surveyId } = useParams();
  const setQuestions = useQuestionStore((state) => state.setQuestions);
  const getSurveyQuestions = async (): Promise<Response> => {
    const response = await api.get(`/surveys/${surveyId}/questions`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: getSurveyQuestions,
    queryKey: [`survey-question-${surveyId}`, surveyId],
    enabled: !!surveyId,
  });


  return {
    questions: data?.data.questions,
    error,
    loading: isLoading,
  };
};
