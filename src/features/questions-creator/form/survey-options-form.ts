import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSurveyOptionsStore } from "@/store/survey-options.store";
export const surveyOptionsSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().optional(),
  collectEmailAddresses: z.boolean().default(false),
  requiresSignIn: z.boolean().default(false),
  showProgressBar: z.boolean().default(false),
  showLinkToSubmitAnother: z.boolean().default(false),
});

export type SurveyOptionsDto = z.infer<typeof surveyOptionsSchema>;

export const useSurveyOptionsForm = () => {
  const { options, updateOptions } = useSurveyOptionsStore();
  const form = useForm<SurveyOptionsDto>({
    resolver: zodResolver(surveyOptionsSchema),
    defaultValues: {
      ...options,
    },
  });
  const submitHandler = (values: SurveyOptionsDto) => {
    updateOptions(values);
  };

  return { form, submitHandler };
};
