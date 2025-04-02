import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";

const multipleChoiceOptions = defaultQuestionOptions.multiple_choice;
export const multipleChoiceQuestionOptionsSchema = z
  .object({
    choices: z
      .array(z.string({ required_error: "A choice is required" }).min(1, {message: "Choice cannot be empty"}))
      .default(multipleChoiceOptions.choices),
    maxLengthForOtherParameter: z.coerce
      .number()
      .default(multipleChoiceOptions.maxLengthForOtherParameter),
    allowOther: z.boolean().default(multipleChoiceOptions.allowOther),
    randomizeOrder: z.boolean().default(multipleChoiceOptions.randomizeOrder),
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
