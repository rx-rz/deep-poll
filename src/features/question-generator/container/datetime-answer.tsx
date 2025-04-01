import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionLabel } from "./question-label";
import { useAnswerStore } from "@/store/answer.store";

type DateTimeAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["datetime"];
  required: boolean;
  control: Control<any>;
};

export const DateTimeAnswer = ({
  questionId,
  questionText,
  options,
  required,
  control,
}: DateTimeAnswerProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem>
          <QuestionLabel questionText={questionText} required={required} />
          <FormControl>
            <Input
              type="datetime-local"
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
