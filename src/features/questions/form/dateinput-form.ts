import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
export const dateFormats = {
  "ISO e.g 2023-04-05": "YYYY-MM-DD",
  "MM/DD/YYYY (US Format) e.g 04/15/2023": "MM/DD/YYYY",
  "DD/MM/YYYY (UK/European Format)  e.g 15/04/2023": "DD/MM/YYYY",
  "Month name, day and year e.g April 15, 2023": "MMMM D, YYYY",
} as const;
const dateOptions = defaultQuestionOptions.date;

// new schema + form implementation
export const dateQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      format: z
        .enum([
          "ISO e.g 2023-04-05",
          "MM/DD/YYYY (US Format) e.g 04/15/2023",
          "DD/MM/YYYY (UK/European Format)  e.g 15/04/2023",
          "Month name, day and year e.g April 15, 2023",
        ])
        .default(dateOptions.format),
      minDate: z.string().default(dateOptions.minDate),
      maxDate: z.string().default(dateOptions.maxDate),
    }),
  })
  .refine(
    (data) => {
      if (!data.options.minDate || !data.options.maxDate) return true;
      const format = dateFormats[data.options.format];
      if (data.options.minDate) {
        const minDateObj = dayjs(data.options.minDate, format);
        return minDateObj.isValid();
      }
      if (data.options.maxDate) {
        const maxDateObj = dayjs(data.options.maxDate, format);
        return maxDateObj.isValid();
      }
      return true;
    },
    {
      message: "Date must be valid date according to the specified format",
      path: ["options", "minDate"],
    }
  )
  .superRefine(({ options }, ctx) => {
    const { minDate, maxDate, format } = options;
    if (minDate && maxDate) {
      const parsedMinDate = dayjs(minDate, dateFormats[format]);
      const parsedMaxDate = dayjs(maxDate, dateFormats[format]);
      if (parsedMinDate.isValid() && parsedMaxDate.isValid()) {
        if (parsedMinDate.isAfter(parsedMaxDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Minimum date cannot be after maximum date",
            path: ["options", "minDate"],
          });
        }
        if (parsedMaxDate.isBefore(parsedMinDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Maximum date cannot be before minimum date",
            path: ["options", "maxDate"],
          });
        }
      }
    }
  });

export type DateQuestionDto = z.infer<typeof dateQuestionSchema>;

export const useDateQuestionCreationForm = ({
  question,
}: {
  question: Question<"date">;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const addApiQueuedQuestion = useQuestionStore(
    (state) => state.addApiQueuedQuestion
  );
  const form = useForm<DateQuestionDto>({
    resolver: zodResolver(dateQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: DateQuestionDto) => {
    updateQuestion(question.id, { ...question, ...values });
    addApiQueuedQuestion(question.id, { ...question, ...values });
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
