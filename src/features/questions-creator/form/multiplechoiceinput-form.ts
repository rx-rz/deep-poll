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
  id,
}: {
  question: MultipleChoiceQuestionDto;
  id: string;
}) => {
  const questionInStore = useQuestionStore((state) =>
    state.getQuestion(id)
  ) as Question<"multiple_choice">;
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const removeApiQueuedQuestion = useQuestionStore(
    (state) => state.removeApiQueuedQuestion
  );
  const addApiQueuedQuestion = useQuestionStore(
    (state) => state.addApiQueuedQuestion
  );
  const form = useForm<MultipleChoiceQuestionDto>({
    resolver: zodResolver(multipleChoiceQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: MultipleChoiceQuestionDto) => {
    updateQuestion(id, {
      questionType: "multiple_choice",
      questionText: values.questionText,
      options: values.options,
    });
    removeApiQueuedQuestion(questionInStore.id)
    addApiQueuedQuestion(id, {
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
