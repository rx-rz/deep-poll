import { Control } from "react-hook-form";
import { QuestionOptionsMap } from "@/types/questions";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAnswerStore } from "@/store/answer.store";

type EmailAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["email"];
  required: boolean;
  control: Control<any>;
};

export const EmailAnswer = ({
  questionId,
  options,
  control,
}: EmailAnswerProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem className="relative">
          <Input
            {...field}
            type="email"
            placeholder={options.placeholder}
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
