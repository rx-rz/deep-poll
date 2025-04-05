import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { defaultQuestionOptions } from "@/lib/default-question-options";
export const dateFormats = {
  "ISO e.g 2023-04-05": "YYYY-MM-DD",
  "MM/DD/YYYY (US Format) e.g 04/15/2023": "MM/DD/YYYY",
  "DD/MM/YYYY (UK/European Format)  e.g 15/04/2023": "DD/MM/YYYY",
  "Month name, day and year e.g April 15, 2023": "MMMM D, YYYY",
} as const;
const dateOptions = defaultQuestionOptions.date;
export const dateQuestionOptionsSchema = z
  .object({
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
    allowPastDates: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.minDate || !data.maxDate) return true;
      const format = dateFormats[data.format];
      if (data.minDate) {
        const minDateObj = dayjs(data.minDate, format);
        return minDateObj.isValid();
      }
      if (data.maxDate) {
        const maxDateObj = dayjs(data.maxDate, format);
        return maxDateObj.isValid();
      }
      return true;
    },
    {
      message: "Date must be valid date according to the specified format",
      path: ["minDate"],
    }
  )
  .superRefine(({ minDate, maxDate }, ctx) => {
    if (minDate && maxDate) {
      if (minDate > maxDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Minimum date cannot be higher than maximum date",
          path: ["minDate"],
        });
      }
      if (maxDate < minDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Maximum date cannot be lower than minimum date",
          path: ["maxDate"],
        });
      }
    }
  })
  .superRefine(({ minDate, maxDate, format: f, allowPastDates }, ctx) => {
    if (allowPastDates === false) {
      const format = dateFormats[f];
      const minDateObj = dayjs(minDate, format);
      const maxDateObj = dayjs(maxDate, format);
      const now = dayjs(Date.now());
      if (minDateObj.isBefore(now)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Minimum date cannot be in the past",
          path: ["minDate"],
        });
      }
      if (maxDateObj.isBefore(now)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Maximum date cannot be in the past",
          path: ["maxDate"],
        });
      }
    }
  });

export type DateQuestionOptionsDto = z.infer<typeof dateQuestionOptionsSchema>;

type FormValidatorProps = {
  questionOptions: DateQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<DateQuestionOptionsDto>
  >;
};

export const useDateQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<DateQuestionOptionsDto>({
    resolver: zodResolver(dateQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: DateQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
