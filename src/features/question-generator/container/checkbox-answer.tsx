import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { QuestionLabel } from "./question-label";

type Props = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["checkbox"];
  required: boolean;
  control: Control<any>;
};

export const CheckboxAnswer = ({
  questionId,
  control,
  options,
  questionText,
  required,
}: Props) => {
  const { choices, minSelections, maxSelections, randomizeOrder } = options;
  console.log({ minSelections, maxSelections });
  return (
    <>
      <FormField
        control={control}
        name={questionId}
        render={({ field }) => (
          <FormItem>
            <QuestionLabel questionText={questionText} required={required} />
            <FormControl>
              <div>
                {choices.map((choice) => (
                  <>
                    <Checkbox
                      key={choice}
                      checked={
                        Array.isArray(field.value) &&
                        field.value.includes(choice)
                      }
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([
                            ...(Array.isArray(field.value) ? field.value : []),
                            choice,
                          ]);
                        } else {
                          field.onChange(
                            Array.isArray(field.value)
                              ? field.value.filter((value) => value !== choice)
                              : []
                          );
                        }
                      }}
                    />
                    <FormLabel className="text-sm font-normal">
                      {choice}
                    </FormLabel>
                  </>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
