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
import { OptionsButton } from "./options-button";
import { QuestionOptionLabel } from "./question-option-label";
import { useNumberQuestionCreationForm } from "../form/numberinput-form";
import { ResetButton } from "./reset-button";
import { defaultQuestionOptions } from "@/lib/default-question-options";

type Props = {
  question: Question<"number">;
};

export const NumberInputQuestionCreator = memo(({ question }: Props) => {
  const options = defaultQuestionOptions.number;
  const { form, onSubmit } = useNumberQuestionCreationForm({
    question,
  });

  const { control, formState, reset } = form;
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
                  <div className="flex">
                    <Input {...field} inputMode="decimal" type="number" />
                    <ResetButton
                      disabled={isDirty === false}
                      onClick={() => {
                        reset({
                          options: { min: options.min },
                        });
                      }}
                    />
                  </div>
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
                  <div className="flex">
                    <Input {...field} inputMode="decimal" type="number" />
                    <ResetButton
                      disabled={isDirty === false}
                      onClick={() => {
                        reset({
                          options: { max: options.max },
                        });
                      }}
                    />
                  </div>
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
                <div className="flex items-center border bg-muted rounded-md p-4 justify-between gap-2 mt-5 mb-4">
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
