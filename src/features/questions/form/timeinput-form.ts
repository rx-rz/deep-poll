import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateQuestion } from "../api/use-create-question";
import { toast } from "sonner";
import { handleAPIErrors } from "@/lib/errors";

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
}: {
  question: Question<"time">;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const { mutate } = useCreateQuestion();
  const form = useForm<TimeQuestionDto>({
    resolver: zodResolver(timeQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: TimeQuestionDto) => {
    const loadingToast = toast.loading("Saving changes");
    mutate(
      {
        ...question,
        options: values.options,
        questionText: values.questionText,
      },
      {
        onSuccess: () => {
          toast.success("Survey updated successfully");
          updateQuestion(question.id, {
            questionText: values.questionText,
            options: values.options,
          });
        },
        onError: (error) => {
          handleAPIErrors(error);
        },
        onSettled: () => {
          toast.dismiss(loadingToast);
        },
      }
    );
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
