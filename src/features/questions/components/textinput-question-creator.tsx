import { Question } from "@/types/questions";
import { useTextQuestionCreationForm } from "../form/textinput-form";

import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { QuestionOptionLabel } from "./question-option-label";
import { OptionsButton } from "./options-button";
import { Checkbox } from "@/components/ui/checkbox";
import { ResetButton } from "./reset-button";

type Props = {
  question: Question<"text">;
};
export const TextInputQuestionCreator = memo(({ question }: Props) => {
  const { form, onSubmit } = useTextQuestionCreationForm({
    question,
  });

  const { control, formState, reset } = form;
  const { isDirty } = formState;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <FormField
            control={control}
            name="questionText"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Question Text" />
                <FormControl>
                  <Input
                    type="text"
                    className="bg-muted focus:bg-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="options.minAnswerLength"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Minimum Answer Length" />
                <FormControl>
                  <div className="flex">
                    <Input {...field} inputMode="decimal" type="number" />
                    <ResetButton
                      disabled={isDirty === false}
                      onClick={() => {
                        reset({
                          ...form.getValues(),
                          options: {
                            ...form.getValues("options"),
                            minAnswerLength: undefined,
                          },
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
            name="options.maxAnswerLength"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Minimum Answer Length" />
                <FormControl>
                  <div className="flex">
                    <Input {...field} inputMode="decimal" type="number" />
                    <ResetButton
                      disabled={isDirty === false}
                      onClick={() => {
                        reset({
                          ...form.getValues(),
                          options: {
                            ...form.getValues("options"),
                            maxAnswerLength: undefined,
                          },
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
                <QuestionOptionLabel text="Question Placeholder" />
                <FormControl>
                  <Input type="text" max={300} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="options.isMultiline"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center border bg-muted rounded-md p-4 justify-between gap-2 mt-5 mb-4">
                  <Label className="text-xs">Accept Multiline Answers</Label>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <OptionsButton disabled={!isDirty}>Save</OptionsButton>
        </div>
      </form>
    </Form>
  );
});
