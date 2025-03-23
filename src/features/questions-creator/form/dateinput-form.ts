import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const dateQuestionOptionsSchema = z
  .object({
    format: z.string().default("yyyy-MM-dd"),
    minDate: z.string().optional(),
    maxDate: z.string().optional(),
    allowPastDates: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.allowPastDates && data.minDate) {
        const currentDate = new Date();
        const minDate = new Date(data.minDate);

        // Set hours, minutes, seconds, milliseconds to 0 for accurate date comparison
        currentDate.setHours(0, 0, 0, 0);
        minDate.setHours(0, 0, 0, 0);

        return minDate >= currentDate;
      }
      return true; // If allowPastDates is true or minDate is not provided, no validation needed
    },
    {
      message:
        "Minimum date must be greater than or equal to the current date when past dates are not allowed.",
      path: ["minDate"],
    }
  );

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
