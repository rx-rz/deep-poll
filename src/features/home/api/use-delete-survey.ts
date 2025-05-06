import { api } from "@/lib/axios";
import { protectedRoutes } from "@/routes";
import { useSurveyListStore } from "@/store/surveys.store";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";

type Response = {
  success: boolean;
  message: string;
  data: {
    id: string;
  };
};

export const useDeleteSurvey = () => {
  const { surveyId } = useParams();
  const deleteSurveyInStore = useSurveyListStore((state) => state.deleteSurvey);
  const [_, navigate] = useLocation();
  const deleteSurveyFunction = async (): Promise<Response> => {
    const response = await api.delete(`/surveys/${surveyId}`);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deleteSurveyFunction,
    onSuccess: ({ data }) => {
      deleteSurveyInStore(data.id);
      navigate(protectedRoutes.HOME);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    deleteSurvey: mutate,
    loading: isPending,
  };
};
