import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";

type Response = {
  success: boolean;
  message: string;
  data: {
    survey: any;
  };
};

export const useGetSurveyDetails = () => {
  const { surveyId } = useParams();

  const getSurveyDetails = async (): Promise<Response> => {
    const response = await api.get(`/surveys/${surveyId}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: getSurveyDetails,
    queryKey: ["survey", surveyId],
    enabled: !!surveyId,
  });

  return {
    survey: data?.data.survey ?? null,
    error,
    loading: isLoading,
  };
  // const surveyId =
};
