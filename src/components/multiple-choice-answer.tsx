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
import { useMemo, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { shuffleArray } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

type MultipleChoiceAnswerProps = {
  id: string;
  questionText: string;
  options: QuestionOptionsMap["multiple_choice"];
  required: boolean;
  control: Control<any>;
};

export const MultipleChoiceAnswer = ({
  id,
  options,
  control,
}: MultipleChoiceAnswerProps) => {
  const { allowOther, choices, randomizeOrder } = options;

  const displayedChoices = useMemo(() => {
    return randomizeOrder ? shuffleArray(choices) : choices;
  }, [randomizeOrder, choices]);

  const [userChoseOther, setUserChoseOther] = useState(false);
  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-1"
            >
              {displayedChoices.map((choice) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={choice}
                >
                  <FormControl>
                    <RadioGroupItem
                      value={choice}
                      id={choice}
                      onChange={() => {
                        setUserChoseOther(false);
                        field.onChange(choice);
                      }}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor={`${id}-${choice}`}
                    className="font-normal cursor-pointer"
                  >
                    {choice}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <div>
            <FormControl>
              <div className="flex gap-x-5">
                <Checkbox
                  value="other"
                  id="other"
                  onClick={() => {
                    if (userChoseOther === true) {
                      setUserChoseOther(false);
                      field.onChange(choices[0]);
                    } else {
                      setUserChoseOther(true);
                    }
                  }}
                />
                <FormLabel
                  htmlFor={`other`}
                  className="font-normal cursor-pointer"
                >
                  Other
                </FormLabel>
              </div>
            </FormControl>
          </div>
          {allowOther && userChoseOther ? (
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
                  if (choices.includes(e.target.value)) {
                    field.onChange("");
                  } else {
                    field.onChange(e.target.value);
                  }
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
