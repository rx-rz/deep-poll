import { Control } from "react-hook-form";
import { QuestionOptionsMap } from "@/types/questions";

import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

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
              }}
            />
          ) : (
            <Input
              {...field}
              placeholder={options.placeholder}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
