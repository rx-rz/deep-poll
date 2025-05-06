import { Question } from "@/types/questions";
import { memo } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OptionsButton } from "../components/options-button";
import { QuestionOptionLabel } from "../components/question-option-label";
import { useNumberQuestionCreationForm } from "../form/numberinput-form";

type Props = {
  question: Question<"number">;
};

export const NumberInputQuestionCreator = memo(({ question }: Props) => {
  const { form, onSubmit } = useNumberQuestionCreationForm({
    question,
  });

  const { control, formState } = form;
  const { isDirty } = formState;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 mb-4">
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
                  <Input {...field} inputMode="decimal" type="number" />
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
                  <Input {...field} inputMode="decimal" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="options.placeholder"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Placeholder" />
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="options.allowDecimal"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center border-2 rounded-md p-4 justify-between gap-2 mt-5 mb-4">
                  <Label className="text-xs">Allow Decimals</Label>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <OptionsButton disabled={!isDirty} type="submit">
            Save
          </OptionsButton>
        </div>
      </form>
    </Form>
  );
});
