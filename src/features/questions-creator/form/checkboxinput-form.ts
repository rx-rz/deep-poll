import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";

const checkboxOptions = defaultQuestionOptions.checkbox;

export const checkboxQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      choices: z.array(z.string().min(1)).default(checkboxOptions.choices),
      minSelections: z.coerce
        .number()
        .min(0, "Minimum selections must be at least 0")
        .default(checkboxOptions.minSelections),
      maxSelections: z.coerce
        .number()
        .min(1, "Maximum selections must be at least 1")
        .default(checkboxOptions.maxSelections),
      randomizeOrder: z.boolean().default(false),
    }),
  })
  .refine((data) => data.options.maxSelections >= data.options.minSelections, {
    message:
      "Maximum selections must be greater than or equal to minimum selections",
    path: ["options", "maxSelections"],
  })
  .refine((data) => data.options.choices.length > 0, {
    message: "Choices must have at least one option",
    path: ["options", "choices"],
  });

export type CheckboxQuestionDto = z.infer<typeof checkboxQuestionSchema>;

export const useCheckboxQuestionCreationForm = ({
  question,
  id,
}: {
  question: CheckboxQuestionDto;
  id: string;
}) => {
  const questionInStore = useQuestionStore((state) =>
    state.getQuestion(id)
  ) as Question<"checkbox">;
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const addApiQueuedQuestion = useQuestionStore(
    (state) => state.addApiQueuedQuestion
  );
  const form = useForm<CheckboxQuestionDto>({
    resolver: zodResolver(checkboxQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: CheckboxQuestionDto) => {
    updateQuestion(id, {
      questionText: values.questionText,
      options: values.options,
    });
    addApiQueuedQuestion(id, {
      ...questionInStore,
      questionType: "checkbox",
      questionText: values.questionText,
      options: values.options,
    });
    form.reset(values);
  };

  return {
    form,
  onSubmit: form.handleSubmit(onSubmit),
  };
};
