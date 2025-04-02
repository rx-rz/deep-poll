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
import { useNumberQuestionOptionsForm } from "../form/numberinput-form";
import { QuestionOptionsMap } from "@/types/questions";
import { OptionsButton } from "../components/options-button";
import { QuestionOptionLabel } from "../components/question-option-label";
import { Checkbox } from "@/components/ui/checkbox";

type LocalQuestionOptions = QuestionOptionsMap["number"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const NumberQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useNumberQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 mb-4">
            <FormField
              control={control}
              name="min"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Minimum Value" />
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
              name="max"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Maximum Value" />
                  <FormControl>
                    <Input
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
              name="allowDecimal"
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
  }
);
