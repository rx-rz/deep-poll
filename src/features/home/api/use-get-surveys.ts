import { api } from "@/lib/axios";
import { Survey } from "@/types/survey";
import { useQuery } from "@tanstack/react-query";

type Response = {
  success: boolean;
  message: string;
  data: {
    surveys: Survey[];
  };
};

export const useGetSurveys = () => {
  const getSurveys = async (): Promise<Response> => {
    const response = await api.get("/surveys");
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: getSurveys,
    queryKey: ["surveys"],
  });

  return {
    surveys: data?.data.surveys ?? [],
    error,
    loading: isLoading,
  };
};
