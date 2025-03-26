import { Control } from "react-hook-form";
import { QuestionOptionsMap } from "@/types/questions";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAnswerStore } from "@/store/answer.store";
import { QuestionLabel } from "./question-label";

type EmailAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["email"];
  required: boolean;
  control: Control<any>;
};

export const EmailAnswer = ({
  questionId,
  questionText,
  options,
  required,
  control,
}: EmailAnswerProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const { placeholder, minEmailLength, maxEmailLength } = options;

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem className="relative">
          <QuestionLabel questionText={questionText} required={required} />
          <Input
            {...field}
            type="email"
            minLength={minEmailLength ?? 1}
            maxLength={maxEmailLength ?? 255}
            placeholder={placeholder}
            onChange={(e) => {
              field.onChange(e);
              setAnswer(questionId, e.target.value);
            }}
          />
          <FormMessage className="text-xs -mt-1" />
        </FormItem>
      )}
    />
  );
};
