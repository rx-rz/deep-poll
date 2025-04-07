import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type DateAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["date"];
  required: boolean;
  control: Control<any>;
};

export const DateAnswer = ({
  questionId,
  control,
}: DateAnswerProps) => {
  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="date"
              {...field}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
