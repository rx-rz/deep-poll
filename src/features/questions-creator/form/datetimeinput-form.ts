import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const dateTimeFormats = {
  "ISO e.g 2023-04-15T14:30:45": "YYYY-MM-DDTHH:mm:ss",
  "Date and 12-hour time e.g Apr 15, 2023 2:30 PM": "MMM D, YYYY h:mm A",
  "Date and 24-hour time e.g 15/04/2023 14:30": "DD/MM/YYYY HH:mm",
  "Full date and time e.g April 15, 2023 14:30:45": "MMMM D, YYYY HH:mm:ss",
  "Compact date and time e.g 20230415143045": "YYYYMMDDHHmmss",
} as const;

export const datetimeQuestionOptionsSchema = z
  .object({
    format: z.string().default("yyyy-MM-dd HH:mm"),
    minDatetime: z.string().optional(),
    maxDatetime: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.minDatetime && data.maxDatetime) {
        return new Date(data.minDatetime) < new Date(data.maxDatetime);
      }
      return true; // Skip validation if either minDatetime or maxDatetime is missing
    },
    {
      message: "Minimum datetime must be less than maximum datetime.",
      path: ["minDatetime"],
    }
  );

export type DateTimeQuestionOptionsDto = z.infer<
  typeof datetimeQuestionOptionsSchema
>;

type FormValidatorProps = {
  questionOptions: DateTimeQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<DateTimeQuestionOptionsDto>
  >;
};

export const useDateTimeQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<DateTimeQuestionOptionsDto>({
    resolver: zodResolver(datetimeQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: DateTimeQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
