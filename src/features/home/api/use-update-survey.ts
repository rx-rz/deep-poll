import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { UpdateSurveyDto } from "../schema";

type Response = {
  success: boolean;
  message: string;
  data: {
    id: string;
  };
};

export const useUpdateSurvey = () => {
  const updateSurvey = async (dto: UpdateSurveyDto): Promise<Response> => {
    const { id, ...values } = dto;
    const response = await api.put(`/surveys/${id}`, values);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateSurvey,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return {
    mutate,
    loading: isPending,
  };
};
