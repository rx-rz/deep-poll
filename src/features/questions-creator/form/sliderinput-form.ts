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
      defaultValue: z
        .union([
          z.coerce.number(),
          z.tuple([z.coerce.number(), z.coerce.number()]),
        ])
        .optional(),
    }),
  })
  .refine((data) => data.options.max > data.options.min, {
    message: "Maximum value must be greater than minimum value",
    path: ["options", "max"],
  })
  .refine(
    (data) => {
      if (data.options.range && Array.isArray(data.options.defaultValue)) {
        return (
          data.options.defaultValue[0] >= data.options.min &&
          data.options.defaultValue[1] <= data.options.max &&
          data.options.defaultValue[0] <= data.options.defaultValue[1]
        );
      }
      if (
        !data.options.range &&
        typeof data.options.defaultValue === "number"
      ) {
        return (
          data.options.defaultValue >= data.options.min &&
          data.options.defaultValue <= data.options.max
        );
      }
      return true;
    },
    {
      message: "Default value(s) must be within the min and max range.",
      path: ["options", "defaultValue"],
    }
  );

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
  });

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
