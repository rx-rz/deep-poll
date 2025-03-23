// timeQuestionOptionsSchema.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const timeQuestionOptionsSchema = z
  .object({
    format: z.string().default("HH:mm"),
    minTime: z.string().optional(),
    maxTime: z.string().optional(),
    allowElapsedTime: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.minTime && data.maxTime) {
        return data.minTime < data.maxTime;
      }
      return true;
    },
    {
      message: "Minimum time must be less than maximum time.",
      path: ["minTime"],
    }
  )
  .refine(
    (data) => {
      if (!data.allowElapsedTime && data.minTime) {
        const now = new Date();
        const [hours, minutes] = data.minTime.split(":").map(Number);
        const minTimeDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes
        );

        return minTimeDate >= now;
      }
      return true;
    },
    {
      message:
        "Minimum time must be greater than or equal to the current time when elapsed time is not allowed.",
      path: ["minTime"],
    }
  );

export type TimeQuestionOptionsDto = z.infer<typeof timeQuestionOptionsSchema>;

type FormValidatorProps = {
  questionOptions: TimeQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<TimeQuestionOptionsDto>
  >;
};

export const useTimeQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<TimeQuestionOptionsDto>({
    resolver: zodResolver(timeQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: TimeQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
