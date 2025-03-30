import { useAnswerStore } from "@/store/answer.store";
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
import { useMemo } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
type MultipleChoiceAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["multiple_choice"];
  required: boolean;
  control: Control<any>;
};

export const MultipleChoiceAnswer = ({
  questionId,
  questionText,
  options,
  required,
  control,
}: MultipleChoiceAnswerProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const { allowOther, choices, randomizeOrder } = options;

  function shuffleArray(array: string[]) {
    const shuffled = [...array]; // Create a copy to avoid mutating the original array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  }

  const displayedChoices = useMemo(() => {
    return randomizeOrder ? shuffleArray(choices) : choices;
    // Only re-shuffle if randomizeOrder or the choices array itself changes
  }, [randomizeOrder, choices]);

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <QuestionLabel questionText={questionText} required={required} />
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {displayedChoices.map((choice) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={choice}
                >
                  <FormControl>
                    <RadioGroupItem value={choice} id={choice} />
                  </FormControl>
                  <FormLabel
                    htmlFor={`${questionId}-${choice}`}
                    className="font-normal cursor-pointer"
                  >
                    {choice}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {allowOther ? (
            <>
              <Label>Other:</Label>
              <Input
                {...field}
                //
                value={
                  field.value && !choices.includes(field.value)
                    ? field.value
                    : ""
                }
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            </>
          ) : (
            <></>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
