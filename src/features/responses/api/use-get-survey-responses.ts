import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";

type Response = {
  success: boolean;
  message: string;
  data: {
    responses: {
      id: string;
      surveyId: string | null;
      accountId: string | null;
      submittedAt: string;
      idempotencyKey: string | null;
    }[];
  };
};
export const useGetSurveyResponses = () => {
  const { surveyId } = useParams();
  const getSurveyResponses = async (): Promise<Response> => {
    const response = await api.get(`/surveys/${surveyId}/responses`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: getSurveyResponses,
    queryKey: [`survey-responses`, surveyId],
    enabled: !!surveyId,
  });

  return {
    responses: data?.data.responses,
    error,
    loading: isLoading
  };
};
