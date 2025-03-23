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
import { useTextQuestionOptionsForm } from "../form/textinput-form";

type LocalQuestionOptions = QuestionOptionsMap["text"];
type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const TextQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const defaultValues = {
      placeholder: questionOptions?.placeholder ?? "",
      minAnswerLength: questionOptions?.minAnswerLength ?? 1,
      maxAnswerLength: questionOptions?.maxAnswerLength ?? 255,
    };

    const { form, onSubmit } = useTextQuestionOptionsForm({
      questionOptions: defaultValues,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid  gap-4 mb-4">
            <FormField
              control={control}
              name="minAnswerLength"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs mb-2">Minimum Answer Length</Label>
                  <FormControl>
                    <Input
                      type="number"
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
                  <Label className="text-xs mb-2">Maximum Answer Length</Label>
                  <FormControl>
                    <Input
                      min={form.getValues("minAnswerLength")}
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
              name="placeholder"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs mb-2">Question Placeholder</Label>
                  <FormControl>
                    <Input type="text" max={300} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 font-bold"
            disabled={!isDirty}
          >
            SAVE
          </Button>
        </form>
      </Form>
    );
  }
);
