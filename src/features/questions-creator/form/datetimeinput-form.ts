import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const dateTimeFormats = {
  "ISO e.g 2023-04-15T14:30:45": "YYYY-MM-DDTHH:mm:ss",
  "Date and 12-hour time e.g Apr 15, 2023 2:30 PM": "MMM D, YYYY h:mm A",
  "Date and 24-hour time e.g 15/04/2023 14:30": "DD/MM/YYYY HH:mm",
  "Full date and time e.g April 15, 2023 14:30:45": "MMMM D, YYYY HH:mm:ss",
} as const;

export const datetimeQuestionOptionsSchema = z
  .object({
    format: z
      .enum([
        "ISO e.g 2023-04-15T14:30:45",
        "Date and 12-hour time e.g Apr 15, 2023 2:30 PM",
        "Date and 24-hour time e.g 15/04/2023 14:30",
        "Full date and time e.g April 15, 2023 14:30:45",
      ])
      .default("Date and 12-hour time e.g Apr 15, 2023 2:30 PM"),
    minDatetime: z.string().optional(),
    maxDatetime: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    
  })

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
