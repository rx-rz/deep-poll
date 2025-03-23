// DateQuestionOptions.tsx
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
import { useDateQuestionOptionsForm } from "../form/dateinput-form";
import { Switch } from "@/components/ui/switch";

type LocalQuestionOptions = QuestionOptionsMap["date"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const DateQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const defaultValues = {
      format: questionOptions?.format ?? "yyyy-MM-dd",
      minDate: questionOptions?.minDate ?? "",
      maxDate: questionOptions?.maxDate ?? "",
      allowPastDates: questionOptions?.allowPastDates ?? false,
    };

    const { form, onSubmit } = useDateQuestionOptionsForm({
      questionOptions: defaultValues,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <Label className="text-xs">Date Format</Label>
              <FormField
                control={control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="e.g., yyyy-MM-dd"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Minimum Date</Label>
                <FormField
                  control={control}
                  name="minDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Label className="text-xs">Maximum Date</Label>
                <FormField
                  control={control}
                  name="maxDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={control}
                name="allowPastDates"
                render={({ field }) => (
                  <FormItem className="flex flex-">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label htmlFor="allowPastDates" className="text-xs">
                      Allow Past Dates
                    </Label>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button className="w-full" type="submit" disabled={!isDirty}>
            Save
          </Button>
        </form>
      </Form>
    );
  }
);
