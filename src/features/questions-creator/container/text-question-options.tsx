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
import { useTextQuestionOptionsForm } from "../form/textinput-form";
import { QuestionOptionLabel } from "../components/question-option-label";
import { OptionsButton } from "../components/options-button";
import { Checkbox } from "@/components/ui/checkbox";

type LocalQuestionOptions = QuestionOptionsMap["text"];
type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const TextQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useTextQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <FormField
              control={control}
              name="minAnswerLength"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Minimum Answer Length" />
                  <FormControl>
                    <Input
                      type="text"
                      min={1}
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
              name="maxAnswerLength"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Minimum Answer Length" />
                  <FormControl>
                    <Input
                      min={form.getValues("minAnswerLength")}
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
              name="placeholder"
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
              name="isMultiline"
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
  }
);
