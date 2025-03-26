import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAnswerStore } from "@/store/answer.store";
import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import { QuestionLabel } from "./question-label";
import { Input } from "@/components/ui/input";
import { defaultQuestionOptions } from "@/lib/default-question-options";

type NumberAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["number"];
  required: boolean;
  control: Control<any>;
};
export const NumberAnswer = ({
  questionId,
  questionText,
  options,
  required,
  control,
}: NumberAnswerProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const { max, min, placeholder } = options;

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem className="relative">
          <QuestionLabel questionText={questionText} required={required} />
          <Input
            {...field}
            type="number"
            max={max ?? defaultQuestionOptions.number.max}
            min={min ?? defaultQuestionOptions.number.min}
            placeholder={placeholder}
            step={undefined}
            // step={allowDecimal ? undefined : 1}
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
