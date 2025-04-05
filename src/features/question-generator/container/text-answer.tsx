import { Control } from "react-hook-form";
import { QuestionOptionsMap } from "@/types/questions";

import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAnswerStore } from "@/store/answer.store";
import { Textarea } from "@/components/ui/textarea";
import { ResetButton } from "../components/reset-button";

type TextAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["text"];
  required: boolean;
  control: Control<any>;
};

export const TextAnswer = ({
  questionId,
  options,
  control,
}: TextAnswerProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem className=" relative">
          {options.isMultiline ? (
            <Textarea
              {...field}
              placeholder={options.placeholder}
              onChange={(e) => {
                field.onChange(e);
                setAnswer(questionId, e.target.value);
              }}
            />
          ) : (
            <Input
              {...field}
              placeholder={options.placeholder}
              onChange={(e) => {
                field.onChange(e);
                setAnswer(questionId, e.target.value);
              }}
            />
          )}
          <ResetButton onClick={() => {}} /> <FormMessage />
        </FormItem>
      )}
    />
  );
};
