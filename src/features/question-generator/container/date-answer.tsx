import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAnswerStore } from "@/store/answer.store";

type DateAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["date"];
  required: boolean;
  control: Control<any>;
};

export const DateAnswer = ({
  questionId,
  questionText,
  options,
  required,
  control,
}: DateAnswerProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);

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
                setAnswer(questionId, e.target.value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
