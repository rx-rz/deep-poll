import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
