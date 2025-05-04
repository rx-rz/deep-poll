import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";

const likertQuestionOptions = defaultQuestionOptions.likert;

// new schema + form implementation
export const likertQuestionSchema = z.object({
  questionText: z.string().default("Lorem ipsum"),
  options: z.object({
    scale: z.coerce
      .number({ message: "Value must be a number" })
      .int()
      .max(7, { message: "Scale must be between 2 and 7" })
      .default(likertQuestionOptions.scale),
    labels: z
      .string()
      .array()
      .min(2)
      .refine((items) => items.length === new Set(items).size, {
        message: "Labels must be unique",
      }),
  }),
});

export type LikertQuestionDto = z.infer<typeof likertQuestionSchema>;

export const useLikertQuestionCreationForm = ({
  question,
  id,
}: {
  question: LikertQuestionDto;
  id: string;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const form = useForm<LikertQuestionDto>({
    resolver: zodResolver(likertQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: LikertQuestionDto) => {
    updateQuestion(id, {
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

// old schema + form implementation
export const likertQuestionOptionsSchema = z.object({
  scale: z.coerce
    .number({ message: "Value must be a number" })
    .int()
    .max(7, { message: "Scale must be between 2 and 7" })
    .default(likertQuestionOptions.scale),
  labels: z
    .string()
    .array()
    .min(2)
    .refine((items) => items.length === new Set(items).size, {
      message: "Labels must be unique",
    }),
});

export type LikertQuestionOptionsDto = z.infer<
  typeof likertQuestionOptionsSchema
>;

type FormValidatorProps = {
  questionOptions: LikertQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LikertQuestionOptionsDto>
  >;
};

export const useLikertQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<LikertQuestionOptionsDto>({
    resolver: zodResolver(likertQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: LikertQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
