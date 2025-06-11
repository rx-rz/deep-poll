import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { defaultQuestionOptions } from "@/lib/default-question-options";

type NumberAnswerProps = {
  id: string;
  questionText: string;
  options: QuestionOptionsMap["number"];
  required: boolean;
  control: Control<any>;
};
export const NumberAnswer = ({ id, options, control }: NumberAnswerProps) => {
  const { max, min, placeholder } = options;

  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem className="relative">
          <div>
            <Input
              {...field}
              type="number"
              max={max ?? defaultQuestionOptions.number.max}
              min={min ?? defaultQuestionOptions.number.min}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          </div>
          <FormMessage className="text-xs -mt-1" />
        </FormItem>
      )}
    />
  );
};
