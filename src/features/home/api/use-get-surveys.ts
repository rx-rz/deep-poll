import { api } from "@/lib/axios";
import { protectedRoutes } from "@/routes";
import { useSurveyListStore } from "@/store/surveys.store";
import { Survey } from "@/types/survey";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "wouter/use-browser-location";

export type GetSurveyResponse = {
  success: boolean;
  message: string;
  data: {
    surveys: Survey[];
  };
};

export const useGetSurveys = () => {
  const pathname = usePathname();
  const setStateSurveys = useSurveyListStore((state) => state.setSurveys);
  const getSurveys = async (): Promise<GetSurveyResponse> => {
    const response = await api.get("/surveys");
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: getSurveys,
    queryKey: ["surveys"],
    enabled: pathname === protectedRoutes.HOME,
  });

  setStateSurveys(data?.data.surveys ?? []);

  return {
    surveys: data?.data.surveys ?? [],
    error,
    loading: isLoading,
  };
};
