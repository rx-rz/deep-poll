import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
export const surveyOptionsSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  collectEmailAddresses: z.boolean().default(false),
  requiresSignIn: z.boolean().default(false),
  showProgressBar: z.boolean().default(false),
  showLinkToSubmitAnother: z.boolean().default(false),
});

export type SurveyOptionsDto = z.infer<typeof surveyOptionsSchema>;

export const useSurveyOptionsForm = () => {
  const form = useForm<SurveyOptionsDto>({
    resolver: zodResolver(surveyOptionsSchema),
  });
  const submitHandler = (values: SurveyOptionsDto) => {
    console.log(values);
  };

  return { form, submitHandler };
};
