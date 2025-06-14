import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";

const multipleChoiceOptions = defaultQuestionOptions.multiple_choice;

export const multipleChoiceQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      choices: z
        .array(
          z
            .string({ required_error: "A choice is required" })
            .min(1, { message: "Choice cannot be empty" })
        )
        .default(multipleChoiceOptions.choices),
      maxLengthForOtherParameter: z.coerce
        .number()
        .default(multipleChoiceOptions.maxLengthForOtherParameter),
      allowOther: z.boolean().default(multipleChoiceOptions.allowOther),
      randomizeOrder: z.boolean().default(multipleChoiceOptions.randomizeOrder),
    }),
  })
  .refine((data) => data.options.choices.length > 0, {
    message: "Choices must have at least one option",
    path: ["options", "choices"],
  });

export type MultipleChoiceQuestionDto = z.infer<
  typeof multipleChoiceQuestionSchema
>;

export const useMultipleChoiceQuestionCreationForm = ({
  question,
}: {
  question: Question<"multiple_choice">;
}) => {
  const addApiQueuedQuestion = useQuestionStore(
    (state) => state.addApiQueuedQuestion
  );
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);

  const form = useForm<MultipleChoiceQuestionDto>({
    resolver: zodResolver(multipleChoiceQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: MultipleChoiceQuestionDto) => {
    updateQuestion(question.id, { ...question, ...values });
    addApiQueuedQuestion(question.id, { ...question, ...values });
    form.reset(values);

  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
