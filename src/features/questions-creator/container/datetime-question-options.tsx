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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  dateTimeFormats,
  useDateTimeQuestionOptionsForm,
} from "../form/datetimeinput-form";
import { QuestionOptionLabel } from "../components/question-option-label";
import { OptionsButton } from "../components/options-button";
import { ResetButton } from "../components/reset-button";

type LocalQuestionOptions = QuestionOptionsMap["datetime"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const DateTimeQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useDateTimeQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <FormField
                control={control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <QuestionOptionLabel text="Time Format" />
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time format to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(dateTimeFormats).map((format: any) => (
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
                name="minDatetime"
                render={({ field }) => (
                  <FormItem>
                    <QuestionOptionLabel text="Minimum Datetime" />
                    <FormControl>
                      <div className="relative border">
                        <Input type="datetime-local" {...field} />
                        <ResetButton
                          onClick={() => {
                            form.reset({
                              ...form.getValues(),
                              maxDatetime: "",
                            });
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={control}
                name="maxDatetime"
                render={({ field }) => (
                  <FormItem>
                    <QuestionOptionLabel text="Maximum Datetime" />
                    <FormControl>
                      <div className="relative border">
                        <Input type="datetime-local" {...field} />
                        <ResetButton
                          onClick={() => {
                            form.reset({
                              ...form.getValues(),
                              minDatetime: "",
                            });
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <OptionsButton type="submit" disabled={!isDirty}>
            Save
          </OptionsButton>
        </form>
      </Form>
    );
  }
);
