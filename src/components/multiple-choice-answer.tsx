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
      render={({ field }) => {
        // Check if current value is a custom "other" value
        const isOtherValue = field.value && !choices.includes(field.value);

        return (
          <FormItem className="space-y-3 ">
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  setUserChoseOther(false);
                }}
                value={isOtherValue ? "" : field.value}
                className="flex flex-col space-y-1"
              >
                {displayedChoices.map((choice) => (
                  <FormItem
                    className="flex items-center space-x-3 space-y-0"
                    key={choice}
                  >
                    <FormControl>
                      <RadioGroupItem value={choice} id={`${id}-${choice}`} />
                    </FormControl>
                    <FormLabel
                      htmlFor={`${id}-${choice}`}
                      className="font-medium cursor-pointer"
                    >
                      {choice}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>

            {allowOther && (
              <div>
                <FormControl>
                  <div className="flex gap-x-5">
                    <Checkbox
                      checked={userChoseOther || isOtherValue}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setUserChoseOther(true);
                          field.onChange("");
                        } else {
                          setUserChoseOther(false);
                          field.onChange("");
                        }
                      }}
                      id={`${id}-other`}
                    />
                    <FormLabel
                      htmlFor={`${id}-other`}
                      className="font-normal cursor-pointer"
                    >
                      Other
                    </FormLabel>
                  </div>
                </FormControl>
              </div>
            )}

            {allowOther && (userChoseOther || isOtherValue) && (
              <>
                <Label>Other:</Label>
                <Input
                  value={
                    isOtherValue || userChoseOther ? field.value || "" : ""
                  }
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  placeholder="Please specify..."
                />
              </>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
