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

type LinearScaleAnswerProps = {
  id: string;
  questionText: string;
  options: QuestionOptionsMap["linear_scale"];
  required: boolean;
  control: Control<any>;
};

export const LinearScaleAnswer = ({
  id,
  options,
  control,
}: LinearScaleAnswerProps) => {
  const { min, max, labels } = options;
  const setAnswer = useAnswerStore((state) => state.setAnswer);

  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(parseInt(value));
                setAnswer(id, parseInt(value));
              }}
              value={field.value?.toString()}
              className="flex flex-col space-y-1"
            >
              <div>
                <div className="flex justify-between pb-10 relative">
                  <p className="absolute bottom-0 text-sm font-medium">{labels?.start || min}</p>
                  <p className="absolute bottom-0 right-0 text-sm font-medium">{labels?.end || max}</p>
                  {values.map((value) => (
                    <FormItem
                      key={value}
                      className="flex flex-col  space-y-0 items-center"
                    >
                      <FormLabel className="font-normal">{value}</FormLabel>
                      <FormControl>
                        <RadioGroupItem value={value.toString()} />
                      </FormControl>
                    </FormItem>
                  ))}
                </div>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
