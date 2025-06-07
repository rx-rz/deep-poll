import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const addApiQueuedQuestion = useQuestionStore(
    (state) => state.addApiQueuedQuestion
  );
  const form = useForm<SliderQuestionDto>({
    resolver: zodResolver(sliderQuestionSchema),
    defaultValues: {
      options: question.options,
      questionText: question.questionText,
    },
  });

  const onSubmit = (values: SliderQuestionDto) => {
    updateQuestion(question.id, { ...question, ...values });
    addApiQueuedQuestion(question.id, { ...question, ...values });
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
