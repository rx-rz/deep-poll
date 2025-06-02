import { api } from "@/lib/axios";
import { QuestionOptionsMap, QuestionType } from "@/types/questions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";

type Response = {
  data: {
    questions: {
      questionType: QuestionType;
      questionText: string;
      id: string;
      options?: QuestionOptionsMap[QuestionType] | null;
      answers: {
        id: string;
        questionId: string | null;
        createdAt: Date;
        answerText: string | null;
        answerNumber: number | null;
        answerJson: any;
      }[];
    }[];
  };
};
export const useGetQuestionAnswers = () => {
  const { surveyId } = useParams();

  const getSurveyQuestionAnswers = async (): Promise<Response> => {
    const response = await api.get(`/surveys/${surveyId}/question-answers`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: getSurveyQuestionAnswers,
    queryKey: [`survey-question-answers`, surveyId],
    enabled: !!surveyId,
    refetchOnWindowFocus: false,
  });

  console.log({ data });

  return {
    questionAnswers: data?.data,
  };
};
