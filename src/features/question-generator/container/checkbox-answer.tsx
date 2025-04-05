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

type Props = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["checkbox"];
  required: boolean;
  control: Control<any>;
};

export const CheckboxAnswer = ({ questionId, control, options }: Props) => {
  return (
    <>
      <FormField
        control={control}
        name={questionId}
        render={() => (
          <FormItem>
            {options.choices.map((choice) => (
              <FormField
                key={choice}
                control={control}
                name={questionId}
                render={({ field }) => (
                  <FormItem
                    key={choice}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={
                          Array.isArray(field.value) &&
                          field.value.includes(choice)
                        }
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([
                              ...(Array.isArray(field.value)
                                ? field.value
                                : []),
                              choice,
                            ]);
                          } else {
                            field.onChange(
                              Array.isArray(field.value)
                                ? field.value.filter(
                                    (value) => value !== choice
                                  )
                                : []
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {choice}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
