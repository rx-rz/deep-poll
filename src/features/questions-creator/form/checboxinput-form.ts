import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const checkboxQuestionOptionsSchema = z
  .object({
    choices: z.array(z.string()).default([]),
    minSelections: z
      .number()
      .min(0, "Minimum selections must be at least 0")
      .default(0),
    maxSelections: z
      .number()
      .min(1, "Maximum selections must be at least 1")
      .default(1),
    randomizeOrder: z.boolean().default(false),
  })
  .refine((data) => data.maxSelections >= data.minSelections, {
    message:
      "Maximum selections must be greater than or equal to minimum selections",
    path: ["maxSelections"],
  })
  .refine((data) => data.choices.length > 0, {
    message: "Choices must have at least one option",
    path: ["choices"],
  });

export type CheckboxQuestionOptionsDto = z.infer<
  typeof checkboxQuestionOptionsSchema
>;

type FormValidatorProps = {
  questionOptions: CheckboxQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<CheckboxQuestionOptionsDto>
  >;
};

export const useCheckboxQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<CheckboxQuestionOptionsDto>({
    resolver: zodResolver(checkboxQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: CheckboxQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
