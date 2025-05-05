// form/numberinput-form.ts
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";

const numberOptions = defaultQuestionOptions.number;

// new schema + form implementation
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
  })
  .refine(
    (data) =>
      data.options.allowDecimal === false &&
      (!Number.isInteger(data.options.max) ||
        !Number.isInteger(data.options.min)),
    {
      message: "Values cannot be decimals",
      path: ["options", "max"],
    }
  );

type NumberQuestionDto = z.infer<typeof numberQuestionSchema>;
export const useNumberQuestionCreationForm = ({
  question,
  id,
}: {
  question: NumberQuestionDto;
  id: string;
}) => {
  const questionInStore = useQuestionStore((state) =>
    state.getQuestion(id)
  ) as Question<"number">;
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const addUpdatedQuestion = useQuestionStore(
    (state) => state.addUpdatedQuestion
  );
  const form = useForm<NumberQuestionDto>({
    resolver: zodResolver(numberQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: NumberQuestionDto) => {
    updateQuestion(id, {
      questionType: "number",
      questionText: values.questionText,
      options: values.options,
    });
    addUpdatedQuestion(id, {
      ...questionInStore,
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
