import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";

const numberOptions = defaultQuestionOptions.number;

export const numberQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      placeholder: z
        .string()
        .default(numberOptions.placeholder ?? "")
        .optional(),
      allowDecimal: z.boolean().default(false),
      min: z.coerce
        .number({ message: "Must be a number" })
        .default(numberOptions.min),
      max: z.coerce.number().default(numberOptions.max),
    }),
  })
  .refine((data) => data.options.max >= data.options.min, {
    message: "Maximum value must be greater than or equal to minimum value",
    path: ["options", "max"],
  });
// .refine(
//   (data) => {
//     return !(
//       data.options.allowDecimal === false &&
//       (!Number.isInteger(data.options.min) ||
//         !Number.isInteger(data.options.max))
//     );
//   },
//   {
//     message: "Values cannot be decimals when 'Allow Decimals' is disabled",
//     path: ["options", "max"],
//   }
// );

type NumberQuestionDto = z.infer<typeof numberQuestionSchema>;
export const useNumberQuestionCreationForm = ({
  question,
}: {
  question: Question<"number">;
}) => {
  const addApiQueuedQuestion = useQuestionStore(
    (state) => state.addApiQueuedQuestion
  );
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const form = useForm<NumberQuestionDto>({
    resolver: zodResolver(numberQuestionSchema),
    defaultValues: {
      options: question.options,
      questionText: question.questionText,
    },
  });

  const onSubmit = (values: NumberQuestionDto) => {
    updateQuestion(question.id, { ...question, ...values });
    addApiQueuedQuestion(question.id, {
      ...question,
      ...values,
      questionType: "number",
    });
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
