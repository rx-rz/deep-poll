import { Control } from "react-hook-form";
import { QuestionOptionsMap } from "@/types/questions";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

type EmailAnswerProps = {
  id: string;
  questionText: string;
  options: QuestionOptionsMap["email"];
  required: boolean;
  control: Control<any>;
};

export const EmailAnswer = ({
  id,
  options,
  control,
}: EmailAnswerProps) => {
  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem className="relative">
          <Input
            {...field}
            type="email"
            placeholder={options.placeholder}
            onChange={(e) => {
              field.onChange(e);
            }}
          />
          <FormMessage className="text-xs -mt-1" />
        </FormItem>
      )}
    />
  );
};
