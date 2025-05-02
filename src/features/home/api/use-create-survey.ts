import { api } from "@/lib/axios";
import { CreateSurveyDto } from "../schema";
import { useMutation } from "@tanstack/react-query";

type Response = {
  success: boolean;
  message: string;
  data: {
    id: string;
  };
};

export const useCreateSurvey = () => {
  const createSurvey = async (dto: CreateSurveyDto): Promise<Response> => {
    const response = await api.post("/surveys", dto);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createSurvey,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    const userData = JSON.parse(
      localStorage.getItem("deep-poll-user") || "{}"
    );
    mutate({
      accountId: userData.data.account_id ?? "",
      isPublished: false,
      requiresSignIn: false,
      showLinkToSubmitAnother: false,
      showProgressBar: false,
      title: "Untitled Survey",
      description: "",
    });
  };
  return {
    handleSubmit,
    loading: isPending,
  };
};
