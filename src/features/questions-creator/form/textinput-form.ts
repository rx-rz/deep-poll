import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const textOptions = defaultQuestionOptions.text;
export const textQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      isMultiline: z.boolean().default(false),
      minAnswerLength: z.coerce
        .number({ message: "Value must be a number" })
        .int({ message: "Value must be an integer" })
        .min(1)
        .positive("Minimum length must be positive")
        .default(textOptions.minAnswerLength),
      maxAnswerLength: z.coerce
        .number({ message: "Value must be a number" })
        .int({ message: "Value must be an integer" })
        .min(1)
        .positive("Maximum length must be positive")
        .default(textOptions.maxAnswerLength),
      placeholder: z
        .string()
        .default(textOptions.placeholder ?? "")
        .optional(),
    }),
  })
  .refine(
    (data) => data.options.maxAnswerLength >= data.options.minAnswerLength,
    {
      message:
        "Maximum answer length must be greater than or equal to minimum answer length",
      path: ["maxAnswerLength"],
    }
  )
  .refine(
    (data) => data.options.minAnswerLength <= data.options.maxAnswerLength,
    {
      message:
        "Minimum answer length must be less than or equal to maximum answer length",
      path: ["minAnswerLength"],
    }
  );

type TextQuestionDto = z.infer<typeof textQuestionSchema>;
export const useTextQuestionCreationForm = ({
  id,
  question,
}: {
  id: string;
  question: TextQuestionDto;
}) => {
  const questionInStore = useQuestionStore((state) =>
    state.getQuestion(id)
  ) as Question<"text">;
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const removeUpdatedQuestion = useQuestionStore((state) => state.removeUpdatedQuestion)
  const addUpdatedQuestion = useQuestionStore(
    (state) => state.addUpdatedQuestion
  );
  const form = useForm<TextQuestionDto>({
    resolver: zodResolver(textQuestionSchema),
    defaultValues: {
      options: question.options,
      questionText: question.questionText,
    },
  });

  const onSubmit = (values: TextQuestionDto) => {
    updateQuestion(id, {
      questionType: "text",
      questionText: values.questionText,
      options: values.options,
    });
    removeUpdatedQuestion(questionInStore.id)
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
