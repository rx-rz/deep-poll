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

type LinearScaleAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["linear_scale"];
  required: boolean;
  control: Control<any>;
};

export const LinearScaleAnswer = ({
  questionId,
  questionText,
  options,
  required,
  control,
}: LinearScaleAnswerProps) => {
  const { min, max, labels } = options;
  const setAnswer = useAnswerStore((state) => state.setAnswer);

  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem>
          <QuestionLabel questionText={questionText} required={required} />
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(parseInt(value));
                setAnswer(questionId, parseInt(value));
              }}
              value={field.value?.toString()}
              className="flex flex-col space-y-1"
            >
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{labels?.start || min}</span>
                <span>{labels?.end || max}</span>
              </div>
              <div className="flex flex-row space-x-2">
                {values.map((value) => (
                  <FormItem
                    key={value}
                    className="flex flex-row space-x-3 space-y-0 items-center"
                  >
                    <FormControl>
                      <RadioGroupItem value={value.toString()} />
                    </FormControl>
                    <FormLabel className="font-normal">{value}</FormLabel>
                  </FormItem>
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
