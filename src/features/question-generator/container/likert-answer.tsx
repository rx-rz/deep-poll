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
import { QuestionLabel } from "./question-label";
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
  questionText,
  options,
  required,
  control,
}: LikertAnswerProps) => {
  const { scale, labels, statement } = options;
  const setAnswer = useAnswerStore((state) => state.setAnswer);

  const values = Array.from({ length: scale }, (_, i) => i + 1);

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem>

          {statement && <p className="mb-2">{statement}</p>}
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(parseInt(value));
                setAnswer(questionId, parseInt(value));
              }}
              value={field.value?.toString()}
              className="flex flex-col space-y-1"
            >
              <div className="flex flex-row space-x-4 justify-between">
                {values.map((value, index) => (
                  <div key={value} className="flex flex-col items-center">
                    <RadioGroupItem value={value.toString()} />
                    <FormLabel className="font-normal text-xs mt-1">
                      {labels?.[index] || value}
                    </FormLabel>
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