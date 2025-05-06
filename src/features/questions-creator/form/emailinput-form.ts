import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";

const { email: emailOptions } = defaultQuestionOptions;

export const emailQuestionSchema = z
  .object({
    questionText: z.string(),
    options: z.object({
      minEmailLength: z.coerce
        .number({ message: "Value must be a number" })
        .int({ message: "Value must be an integer" })
        .min(1, "Minimum length must be at least 1")
        .default(emailOptions.minEmailLength),
      maxEmailLength: z.coerce
        .number({ message: "Value must be a number" })
        .int({ message: "Value must be an integer" })
        .min(1, "Maximum length must be at least 1")
        .default(emailOptions.maxEmailLength),
      placeholder: z
        .string()
        .max(300, "Placeholder must be 300 characters or less")
        .default(emailOptions.placeholder ?? "")
        .optional(),
      allowedDomains: z
        .string()
        .optional()
        .refine(
          (value) => {
            if (!value) return true;
            const domains = value.split(",").map((d) => d.trim());
            return domains.every((domain) =>
              /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)
            );
          },
          { message: "One or more domains are invalid" }
        ),
      disallowedDomains: z
        .string()
        .optional()
        .refine(
          (value) => {
            if (!value) return true;
            const domains = value.split(",").map((d) => d.trim());
            return domains.every((domain) =>
              /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)
            );
          },
          { message: "One or more domains are invalid" }
        ),
      allowDuplicates: z.boolean().default(emailOptions.allowDuplicates),
    }),
  })
  .refine(
    (data) => data.options.maxEmailLength >= data.options.minEmailLength,
    {
      message:
        "Maximum email length must be greater than or equal to minimum email length",
      path: ["options", "maxEmailLength"],
    }
  )
  .refine(
    (data) => data.options.minEmailLength <= data.options.maxEmailLength,
    {
      message:
        "Minimum email length must be less than or equal to maximum email length",
      path: ["options", "minEmailLength"],
    }
  );

type EmailQuestionDto = z.infer<typeof emailQuestionSchema>;
export const useEmailQuestionCreationForm = ({
  question,
  id,
}: {
  id: string;
  question: EmailQuestionDto;
}) => {
  const questionInStore = useQuestionStore((state) =>
    state.getQuestion(id)
  ) as Question<"email">;
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const removeApiQueuedQuestion = useQuestionStore(
    (state) => state.removeApiQueuedQuestion
  );
  const addApiQueuedQuestion = useQuestionStore(
    (state) => state.addApiQueuedQuestion
  );
  const form = useForm<EmailQuestionDto>({
    resolver: zodResolver(emailQuestionSchema),
    defaultValues: {
      options: question.options,
      questionText: question.questionText,
    },
  });

  const onSubmit = (values: EmailQuestionDto) => {
    updateQuestion(id, {
      questionType: "email",
      questionText: values.questionText,
      options: values.options,
    });
    removeApiQueuedQuestion(questionInStore.id);
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
