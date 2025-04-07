import { memo } from "react";
import { Input } from "@/components/ui/input";
import { QuestionOptionsMap } from "@/types/questions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useLinearScaleQuestionOptionsForm } from "../form/linearscaleinput-form";
import { QuestionOptionLabel } from "../components/question-option-label";
import { OptionsButton } from "../components/options-button";

type LocalQuestionOptions = QuestionOptionsMap["linear_scale"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const LinearScaleQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const defaultValues = {
      min: questionOptions?.min ?? 0,
      max: questionOptions?.max ?? 100,
      labels: {
        start: questionOptions?.labels?.start ?? "",
        end: questionOptions?.labels?.end ?? "",
      },
    };

    const { form, onSubmit } = useLinearScaleQuestionOptionsForm({
      questionOptions: defaultValues,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 mb-4">
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
                <FormItem className="mb-4">
                  <QuestionOptionLabel text="End Label" />
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
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
  }
);
