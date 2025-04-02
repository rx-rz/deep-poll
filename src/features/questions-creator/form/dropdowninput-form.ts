import { defaultQuestionOptions } from "@/lib/default-question-options";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const dropdownOptions = defaultQuestionOptions.dropdown;

export const dropdownQuestionOptionsSchema = z
  .object({
    choices: z.array(z.string().min(1)).default(dropdownOptions.choices),
    allowSearch: z.boolean().default(dropdownOptions.allowSearch),
  })
  .refine((data) => data.choices.length > 0, {
    message: "Choices must have at least one option",
    path: ["choices"],
  });

export type DropdownQuestionOptionsDto = z.infer<
  typeof dropdownQuestionOptionsSchema
>;

type FormValidatorProps = {
  questionOptions: DropdownQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<DropdownQuestionOptionsDto>
  >;
};

export const useDropdownQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<DropdownQuestionOptionsDto>({
    resolver: zodResolver(dropdownQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: DropdownQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
