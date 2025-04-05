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
import { useMemo } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { shuffleArray } from "@/lib/utils";

type MultipleChoiceAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["multiple_choice"];
  required: boolean;
  control: Control<any>;
};

export const MultipleChoiceAnswer = ({
  questionId,
  options,
  control,
}: MultipleChoiceAnswerProps) => {
  const { allowOther, choices, randomizeOrder } = options;

  const displayedChoices = useMemo(() => {
    return randomizeOrder ? shuffleArray(choices) : choices;
  }, [randomizeOrder, choices]);

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem className="space-y-3">
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
