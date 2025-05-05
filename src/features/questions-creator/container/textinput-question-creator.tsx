import { Question } from "@/types/questions";
import { useTextQuestionCreationForm } from "../form/textinput-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";

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
import { QuestionOptionLabel } from "../components/question-option-label";
import { OptionsButton } from "../components/options-button";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  question: Question<"text">;
};
export const TextInputQuestionCreator = memo(({ question }: Props) => {
  const questionSettings = {
    questionText: question.questionText ?? "",
    options: question.options ?? defaultQuestionOptions.text,
  };
  const { form, onSubmit } = useTextQuestionCreationForm({
    id: question.id,
    question: questionSettings,
  });

  const { control, formState } = form;
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
                  <Input type="text" {...field} />
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
                  <Input
                    type="text"
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
            name="options.maxAnswerLength"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Minimum Answer Length" />
                <FormControl>
                  <Input
                    min={form.getValues("options.maxAnswerLength")}
                    type="text"
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
                <div className="flex items-center border-2 rounded-md p-4 justify-between gap-2 mt-5 mb-4">
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
