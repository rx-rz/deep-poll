import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
export const dateFormats = {
  "ISO e.g 2023-04-05": "YYYY-MM-DD",
  "MM/DD/YYYY (US Format) e.g 04/15/2023": "MM/DD/YYYY",
  "DD/MM/YYYY (UK/European Format)  e.g 15/04/2023": "DD/MM/YYYY",
  "Month name, day and year e.g April 15, 2023": "MMMM D, YYYY",
} as const;

// const formatEnum = z.enum([
//   "ISO e.g 2023-04-05",
//   "MM/DD/YYYY (US Format) e.g 04/15/2023",
//   "DD/MM/YYYY (UK/European Format)  e.g 15/04/2023",
//   "Month name, day and year e.g April 15, 2023",
// ]);

export const dateQuestionOptionsSchema = z
  .object({
    format: z
      .enum([
        "ISO e.g 2023-04-05",
        "MM/DD/YYYY (US Format) e.g 04/15/2023",
        "DD/MM/YYYY (UK/European Format)  e.g 15/04/2023",
        "Month name, day and year e.g April 15, 2023",
      ])
      .default("ISO e.g 2023-04-05"),
    minDate: z.string().optional(),
    maxDate: z.string().optional(),
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
      path: ["minDate", "maxDate"],
    }
  )
  .refine(
    (data) => {
      if (data.allowPastDates === true && (data.minDate || data.maxDate)) {
        const format = dateFormats[data.format];
        const minDateObj = dayjs(data.minDate, format);
        const maxDateObj = dayjs(data.maxDate, format);
        const now = dayjs(Date.now());
        return (
          minDateObj && (minDateObj.isAfter(now) || maxDateObj.isAfter(now))
        );
      }
      return true;
    },
    {
      message: "Date must not be before the current date",
      path: ["minDate", "maxDate"],
    }
  )
  .transform((val) => {
    const format = val.format;
    return {
      ...val,
      minDate: val.minDate ? dayjs(val.minDate, format).toString() : undefined,
      maxDate: val.maxDate ? dayjs(val.maxDate, format).toString() : undefined,
    };
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
