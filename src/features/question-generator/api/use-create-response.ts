import { api } from "@/lib/axios";
import { handleAPIErrors } from "@/lib/errors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocation, useParams } from "wouter";

export const useCreateResponse = () => {
  const { surveyId } = useParams();
  const [_, navigate] = useLocation();

  const createResponse = async (dto: any) => {
    const response = await api.post(`/surveys/${surveyId}/responses`, dto);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createResponse,
    onSuccess: () => {
      toast.success("Response submitted successfully");
    },
    onError: (error) => handleAPIErrors(error),
  });

  return {
    submitResponse: mutate,
    isPending,
  };
};
