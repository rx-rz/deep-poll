import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

type SliderAnswerProps = {
  id: string;
  questionText: string;
  options: QuestionOptionsMap["slider"];
  required: boolean;
  control: Control<any>;
};

export const SliderAnswer = ({
  id,
  options,
  control,
}: SliderAnswerProps) => {
  const { min, max, step, labels, range } = options;

  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => {
        const sliderValue =
          field.value !== undefined
            ? range
              ? Array.isArray(field.value)
                ? field.value
                : [min, max]
              : [field.value]
            : range
            ? [min, max]
            : [min];
        return (
          <FormItem>
            <div className="flex flex-col space-y-2">
              {labels && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{labels.start}</span>
                  <span>{labels.end}</span>
                </div>
              )}
              <Slider
                min={min}
                max={max}
                value={sliderValue}
                step={step || 1}
                onValueChange={(value) => {
                  field.onChange(range ? value : value[0]);
                }}
              />
              {range && Array.isArray(field.value) && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{field.value[0]}</span>
                  <span>{field.value[1]}</span>
                </div>
              )}
              {!range && typeof field.value === "number" && (
                <div className="text-sm text-muted-foreground">
                  <span>{field.value}</span>
                </div>
              )}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
