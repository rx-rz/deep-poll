import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QuestionOptionsMap } from "@/types/questions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSliderOptionsForm } from "../form/sliderinput-form";
import { OptionsButton } from "../components/options-button";
import { QuestionOptionLabel } from "../components/question-option-label";
import { Checkbox } from "@/components/ui/checkbox";

type LocalQuestionOptions = QuestionOptionsMap["slider"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const SliderQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useSliderOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control } = form;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <FormField
              control={control}
              name="min"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Minimum Value" />
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
                  <QuestionOptionLabel text="Maximum Value" />
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
                  <QuestionOptionLabel text="Step" />
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
              name="labels.start"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Start Label" />
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
                  <QuestionOptionLabel text="End Label" />
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="range"
              render={({ field }) => (
                <FormItem className="flex flex-row my-4  items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="range">Range</Label>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <OptionsButton type="submit" disabled={!form.formState.isDirty}>
              Save
            </OptionsButton>
          </div>
        </form>
      </Form>
    );
  }
);
