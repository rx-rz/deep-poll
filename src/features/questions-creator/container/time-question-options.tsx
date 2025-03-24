// TimeQuestionOptions.tsx
import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/types/questions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTimeQuestionOptionsForm } from "../form/timeinput-form";
import { Switch } from "@/components/ui/switch";
type LocalQuestionOptions = QuestionOptionsMap["time"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const TimeQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const defaultValues = {
      format: questionOptions?.format ?? "HH:mm",
      minTime: questionOptions?.minTime ?? "",
      allowElapsedTime: questionOptions?.allowElapsedTime ?? false,
      maxTime: questionOptions?.maxTime ?? "",
    };

    const { form, onSubmit } = useTimeQuestionOptionsForm({
      questionOptions: defaultValues,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid  gap-4 mb-4">
            <div>
              <Label className="text-xs">Time Format</Label>
              <FormField
                control={control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" {...field} placeholder="e.g., HH:mm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Minimum Time</Label>
                <FormField
                  control={control}
                  name="minTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Label className="text-xs">Maximum Time</Label>
                <FormField
                  control={control}
                  name="maxTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="time" {...field} />
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
                name="allowElapsedTime"
                render={({ field }) => (
                  <FormItem className="flex flex-">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label htmlFor="allowElapsedTime" className="text-xs">
                      Allow Elapsed Time
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
