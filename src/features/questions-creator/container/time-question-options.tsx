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
import {
  timeFormats,
  useTimeQuestionOptionsForm,
} from "../form/timeinput-form";
import { QuestionOptionLabel } from "../components/question-option-label";
import { OptionsButton } from "../components/options-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResetButton } from "../components/reset-button";
type LocalQuestionOptions = QuestionOptionsMap["time"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const TimeQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useTimeQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid  gap-4 mb-4">
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
                        {Object.keys(timeFormats).map((format: any) => (
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
                name="minTime"
                render={({ field }) => (
                  <FormItem>
                    <QuestionOptionLabel text="Minimum Time" />
                    <FormControl>
                      <div className="relative border">
                        <Input type="time" {...field} />
                        <ResetButton
                          onClick={() => {
                            form.reset({
                              ...form.getValues(),
                              minTime: "",
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
                name="maxTime"
                render={({ field }) => (
                  <FormItem>
                    <QuestionOptionLabel text="Maximum Time" />
                    <FormControl>
                      <div className="relative border">
                        <Input type="time" {...field} />
                        <ResetButton
                          onClick={() => {
                            form.reset({
                              ...form.getValues(),
                              maxTime: "",
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
