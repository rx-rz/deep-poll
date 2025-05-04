import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const timeFormats = {
  "24-hour with seconds e.g 14:30:45": "HH:mm:ss",
  "24-hour without seconds e.g 14:30": "HH:mm",
  "12-hour with AM/PM e.g 2:30 PM": "h:mm A",
  "12-hour with seconds e.g 2:30:45 PM": "h:mm:ss A",
  "24-hour with milliseconds e.g 14:30:45.123": "HH:mm:ss.SSS",
} as const;

const timeOptions = defaultQuestionOptions.time;

// new schema + form implementation
export const timeQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      format: z
        .enum([
          "24-hour with seconds e.g 14:30:45",
          "24-hour without seconds e.g 14:30",
          "12-hour with AM/PM e.g 2:30 PM",
          "12-hour with seconds e.g 2:30:45 PM",
        ])
        .default("12-hour with AM/PM e.g 2:30 PM"),
      minTime: z.string().default(timeOptions.minTime),
      maxTime: z.string().default(timeOptions.maxTime),
    }),
  })
  .superRefine(({ options }, ctx) => {
    if (options.minTime && options.maxTime) {
      if (options.minTime > options.maxTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Minimum time cannot be later than maximum time",
          path: ["options", "minTime"],
        });
      }
      if (options.maxTime < options.minTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Maximum time cannot be earlier than minimum time",
          path: ["options", "maxTime"],
        });
      }
    }
  });

export type TimeQuestionDto = z.infer<typeof timeQuestionSchema>;

export const useTimeQuestionCreationForm = ({
  question,
  id
}: {
  question: TimeQuestionDto;
  id: string;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const form = useForm<TimeQuestionDto>({
    resolver: zodResolver(timeQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: TimeQuestionDto) => {
    updateQuestion(id, {
      questionText: values.questionText,
      options: values.options,
    })
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};

// old schema + form implementation
export const timeQuestionOptionsSchema = z
  .object({
    format: z
      .enum([
        "24-hour with seconds e.g 14:30:45",
        "24-hour without seconds e.g 14:30",
        "12-hour with AM/PM e.g 2:30 PM",
        "12-hour with seconds e.g 2:30:45 PM",
      ])
      .default("12-hour with AM/PM e.g 2:30 PM"),
    minTime: z.string().default(timeOptions.minTime),
    maxTime: z.string().default(timeOptions.maxTime),
  })
  .superRefine(({ minTime, maxTime }, ctx) => {
    if (minTime && maxTime) {
      if (minTime > maxTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Minimum time cannot be later than maximum time",
          path: ["minTime"],
        });
      }
      if (maxTime < minTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Maximum time cannot be earlier than minimum time",
          path: ["maxTime"],
        });
      }
    }
  });

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