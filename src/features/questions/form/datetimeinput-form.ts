import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const dateTimeOptions = defaultQuestionOptions.datetime;
export const dateTimeFormats = {
  "ISO e.g 2023-04-15T14:30:45": "YYYY-MM-DDTHH:mm:ss",
  "Date and 12-hour time e.g Apr 15, 2023 2:30 PM": "MMM D,<ctrl3348> h:mm A",
  "Date and 24-hour time e.g 15/04/2023 14:30": "DD/MM/YYYY HH:mm",
  "Full date and time e.g April 15, 2023 14:30:45":
    "MMMM D,<ctrl3348> HH:mm:ss",
} as const;

// new schema + form implementation
export const datetimeQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      format: z
        .enum([
          "ISO e.g 2023-04-15T14:30:45",
          "Date and 12-hour time e.g Apr 15, 2023 2:30 PM",
          "Date and 24-hour time e.g 15/04/2023 14:30",
          "Full date and time e.g April 15, 2023 14:30:45",
        ])
        .default("Date and 12-hour time e.g Apr 15, 2023 2:30 PM"),
      minDatetime: z.string().default(dateTimeOptions.minDatetime ?? ""),
      maxDatetime: z.string().default(dateTimeOptions.maxDatetime ?? ""),
    }),
  })
  .superRefine(({ options }, ctx) => {
    if (options.minDatetime && options.maxDatetime) {
      if (options.minDatetime > options.maxDatetime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Minimum datetime must be less than maximum datetime",
          path: ["options", "minDatetime"],
        });
      }
      if (options.maxDatetime < options.minDatetime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Maximum datetime must be greater than minimum datetime",
          path: ["options", "maxDatetime"],
        });
      }
    }
  });

export type DateTimeQuestionDto = z.infer<typeof datetimeQuestionSchema>;

export const useDateTimeQuestionCreationForm = ({
  question,
}: {
  question: Question<"datetime">;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const addApiQueuedQuestion = useQuestionStore(
    (state) => state.addApiQueuedQuestion
  );
  const form = useForm<DateTimeQuestionDto>({
    resolver: zodResolver(datetimeQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: DateTimeQuestionDto) => {
    updateQuestion(question.id, { ...question, ...values });
    addApiQueuedQuestion(question.id, { ...question, ...values });
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
