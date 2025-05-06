import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { UpdateSurveyDto, updateSurveySchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "wouter";
import { useSurveyListStore } from "@/store/surveys.store";
import { toast } from "sonner";

type Response = {
  success: boolean;
  message: string;
  data: {
    id: string;
  };
};

export const useUpdateSurvey = () => {
  const { surveyId } = useParams();
  const updateSurveyInStore = useSurveyListStore((state) => state.updateSurvey);
  const surveyInStore = useSurveyListStore((state) =>
    state.fetchSurveyById(surveyId!)
  );
  const updateSurvey = async (dto: UpdateSurveyDto): Promise<Response> => {
    const response = await api.patch(`/surveys/${surveyId}`, dto);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateSurvey,
  });

  const form = useForm<UpdateSurveyDto>({
    resolver: zodResolver(updateSurveySchema),
    defaultValues: {
      title: surveyInStore?.title,
      description: surveyInStore?.description ?? "",
      isPublished: surveyInStore?.isPublished ?? false,
      requiresSignIn: surveyInStore?.requiresSignIn ?? false,
      showLinkToSubmitAnother: surveyInStore?.showLinkToSubmitAnother ?? false,
      showProgressBar: surveyInStore?.showProgressBar ?? false,
    },
  });

  const handleSubmit = (values: UpdateSurveyDto) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Survey updated successfully");
        form.reset(values);
        updateSurveyInStore(surveyId ?? "", values);
      },
    });
  };

  return {
    mutate,
    loading: isPending,
    handleSubmit,
    form,
  };
};
