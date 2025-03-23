// form/multiplechoice-form.ts
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const multipleChoiceQuestionOptionsSchema = z
  .object({
    choices: z.array(z.string()).default([]),
    allowOther: z.boolean().default(false),
    randomizeOrder: z.boolean().default(false),
  })
  .refine((data) => data.choices.length > 0, {
    message: "Choices must have at least one option",
    path: ["choices"],
  });

export type MultipleChoiceQuestionOptionsDto = z.infer<
  typeof multipleChoiceQuestionOptionsSchema
>;

type FormValidatorProps = {
  questionOptions: MultipleChoiceQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<MultipleChoiceQuestionOptionsDto>
  >;
};

export const useMultipleChoiceQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<MultipleChoiceQuestionOptionsDto>({
    resolver: zodResolver(multipleChoiceQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: MultipleChoiceQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
