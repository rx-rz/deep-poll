// SliderOptions.tsx
import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/store/questions.store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSliderOptionsForm } from "../form/sliderinput-form";
import { Switch } from "@/components/ui/switch";

type LocalQuestionOptions = QuestionOptionsMap["slider"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const SliderQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const defaultValues = {
      min: questionOptions?.min ?? 0,
      max: questionOptions?.max ?? 100,
      step: questionOptions?.step ?? 1,
      labels: {
        start: questionOptions?.labels?.start ?? "",
        end: questionOptions?.labels?.end ?? "",
      },
      range: questionOptions?.range ?? false,
      defaultValue: questionOptions?.defaultValue ?? 0,
    };

    const { form, onSubmit } = useSliderOptionsForm({
      questionOptions: defaultValues,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 mb-4">
            <div className="grid gap-4">
              <FormField
                control={control}
                name="min"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs">Minimum Value</Label>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="max"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs">Maximum Value</Label>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="step"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs">Step</Label>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="labels.start"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs">Start Label</Label>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="labels.end"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs">End Label</Label>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="range"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="range">Range</Label>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full mt-4" type="submit" disabled={!isDirty}>
            Save
          </Button>
        </form>
      </Form>
    );
  }
);
