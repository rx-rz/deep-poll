import { api } from "@/lib/axios";
import { CreateSurveyDto } from "../schema";
import { useMutation } from "@tanstack/react-query";
import { handleAPIErrors } from "@/lib/errors";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { protectedRoutes } from "@/routes";

type Response = {
  success: boolean;
  message: string;
  data: {
    id: string;
  };
};

export const useCreateSurvey = () => {
  const [_, navigate] = useLocation();
  const userData = JSON.parse(localStorage.getItem("deep-poll-user") || "{}");
  const newSurvey = {
    accountId: userData.account_id ?? "",
    isPublished: false,
    requiresSignIn: false,
    showLinkToSubmitAnother: false,
    showProgressBar: false,
    title: "Untitled Survey",
    description: "",
  };

  const createSurvey = async (dto: CreateSurveyDto): Promise<Response> => {
    const response = await api.post("/surveys", dto);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createSurvey,
    onSuccess: ({ message, data }) => {
      toast.success(message);
      navigate(protectedRoutes.CREATE_SURVEY(data.id));
      //   ...old,
      //   {
      //     id: data.id,
      //     accountId: userData.account_id ?? "",
      //     isPublished: false,
      //     requiresSignIn: false,
      //     showLinkToSubmitAnother: false,
      //     showProgressBar: false,
      //     title: "Untitled Survey",
      //     description: "",
      //   },
      // ]);
    },
    onError: (error) => handleAPIErrors(error),
  });

  const handleSubmit = () => {
    mutate(newSurvey);
  };

  return {
    handleSubmit,
    loading: isPending,
  };
};
