import { Question } from "@/types/questions";
import { memo } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OptionsButton } from "./options-button";
import { QuestionOptionLabel } from "./question-option-label";
import { useSliderQuestionCreationForm } from "../form/sliderinput-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  question: Question<"slider">;
};

export const SliderInputQuestionCreator = memo(({ question }: Props) => {

  const { form, onSubmit } = useSliderQuestionCreationForm({
    question,
  });

  const { control, formState } = form;
  const { isDirty } = formState;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <FormField
            control={control}
            name="questionText"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Question Text" />
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="options.min"
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
            name="options.max"
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
            name="options.step"
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
            name="options.labels.start"
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
            name="options.labels.end"
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
            name="options.range"
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

          <OptionsButton type="submit" disabled={!isDirty}>
            Save
          </OptionsButton>
        </div>
      </form>
    </Form>
  );
});
