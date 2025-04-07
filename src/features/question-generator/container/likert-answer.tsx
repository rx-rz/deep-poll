import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useAnswerStore } from "@/store/answer.store";

type LikertAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["likert"];
  required: boolean;
  control: Control<any>;
};

export const LikertAnswer = ({
  questionId,
  options,
  control,
}: LikertAnswerProps) => {
  const { scale, labels } = options;
  const setAnswer = useAnswerStore((state) => state.setAnswer);

  const values = Array.from({ length: scale }, (_, i) => i + 1);

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(parseInt(value));
                setAnswer(questionId, parseInt(value));
              }}
              value={field.value?.toString()}
              className="flex flex-col space-y-1"
            >
              <div className="flex flex-col gap-y-3">
                {values.map((value, index) => (
                  <div key={value} className="flex flex-row gap-3 items-center">
                    <RadioGroupItem value={value.toString()} />
                    <FormLabel>{labels?.[index] || value}</FormLabel>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
