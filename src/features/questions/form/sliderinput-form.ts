import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateQuestion } from "../api/use-create-question";
import { handleAPIErrors } from "@/lib/errors";

const sliderOptions = defaultQuestionOptions.slider;

export const sliderQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      min: z.coerce
        .number({ message: "Value must be a number" })
        .default(sliderOptions.min),
      max: z.coerce
        .number({ message: "Value must be a number" })
        .default(sliderOptions.max),
      step: z.coerce
        .number({ message: "Value must be a number" })
        .default(sliderOptions.step),
      labels: z.object({
        start: z.string().default(sliderOptions.labels.start),
        end: z.string().default(sliderOptions.labels.end),
      }),
      range: z.boolean().default(sliderOptions.range),
    }),
  })
  .refine((data) => data.options.max > data.options.min, {
    message: "Maximum value must be greater than minimum value",
    path: ["options", "max"],
  });

export type SliderQuestionDto = z.infer<typeof sliderQuestionSchema>;

export const useSliderQuestionCreationForm = ({
  question,
}: {
  question: Question<"slider">;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const { mutate } = useCreateQuestion();
  const form = useForm<SliderQuestionDto>({
    resolver: zodResolver(sliderQuestionSchema),
    defaultValues: {
      options: question.options,
      questionText: question.questionText,
    },
  });
  console.log(form.formState.errors);

  const onSubmit = (values: SliderQuestionDto) => {
    const loadingToast = toast.loading("Saving changes");
    mutate(
      {
        ...question,
        options: values.options,
        questionText: values.questionText,
      },
      {
        onSuccess: () => {
          toast.success("Survey updated successfully");
          updateQuestion(question.id, {
            questionText: values.questionText,
            options: values.options,
          });
        },
        onError: (error) => {
          handleAPIErrors(error);
        },
        onSettled: () => {
          toast.dismiss(loadingToast);
        },
      }
    );
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
