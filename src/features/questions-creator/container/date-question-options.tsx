// DateQuestionOptions.tsx
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
import {
  dateFormats,
  useDateQuestionOptionsForm,
} from "../form/dateinput-form";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionOptionLabel } from "../components/question-option-label";
import { OptionsButton } from "../components/options-button";

type LocalQuestionOptions = QuestionOptionsMap["date"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const DateQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useDateQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;
    console.log(Object.keys(dateFormats));
    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <QuestionOptionLabel text="Date Format" />
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a date format to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(dateFormats).map((format: any) => (
                          <SelectItem value={format} key={format}>
                            {format}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={control}
                name="minDate"
                render={({ field }) => (
                  <FormItem>
                    <QuestionOptionLabel text="Minimum Date" />
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={control}
                name="maxDate"
                render={({ field }) => (
                  <FormItem>
                    <QuestionOptionLabel text="Maximum Date" />
                    <FormControl>
                      <Input type="date" {...field} className="w-full border-4"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={control}
            name="allowPastDates"
            render={({ field }) => (
              <FormItem className="border p-4 flex justify-between my-8">
                <Label htmlFor="allowPastDates" className="text-xs">
                  Allow Past Dates
                </Label>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <OptionsButton type="submit" disabled={!isDirty}>
            Save
          </OptionsButton>
        </form>
      </Form>
    );
  }
);
