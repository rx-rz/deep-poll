import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const dropdownOptions = defaultQuestionOptions.dropdown;

// new schema + form implementation
export const dropdownQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      choices: z.array(z.string().min(1)).default(dropdownOptions.choices),
      allowSearch: z.boolean().default(dropdownOptions.allowSearch),
    }),
  })
  .refine((data) => data.options.choices.length > 0, {
    message: "Choices must have at least one option",
    path: ["options", "choices"],
  });

export type DropdownQuestionDto = z.infer<typeof dropdownQuestionSchema>;

export const useDropdownQuestionCreationForm = ({
  question,
  id,
}: {
  question: DropdownQuestionDto;
  id: string;
}) => {
  const questionInStore = useQuestionStore((state) =>
    state.getQuestion(id)
  ) as Question<"dropdown">;
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const addUpdatedQuestion = useQuestionStore(
    (state) => state.addUpdatedQuestion
  );
  const form = useForm<DropdownQuestionDto>({
    resolver: zodResolver(dropdownQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: DropdownQuestionDto) => {
    updateQuestion(id, {
      questionText: values.questionText,
      options: values.options,
    });
    addUpdatedQuestion(id, {
      ...questionInStore,
      questionText: values.questionText,
      options: values.options,
    });
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};

// old schema + form implementation
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
