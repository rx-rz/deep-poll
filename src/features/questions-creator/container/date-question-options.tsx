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
import {
  dateFormats,
  useDateQuestionOptionsForm,
} from "../form/dateinput-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionOptionLabel } from "../components/question-option-label";
import { OptionsButton } from "../components/options-button";
import { ResetButton } from "../components/reset-button";

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
                    <FormControl className="border">
                      <div className="relative border">
                        <Input type="date" {...field} />
                        <ResetButton
                          onClick={() => {
                            form.reset({
                              ...form.getValues(),
                              minDate: "",
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

            <div>
              <FormField
                control={control}
                name="maxDate"
                render={({ field }) => (
                  <FormItem>
                    <QuestionOptionLabel text="Maximum Date" />
                    <FormControl>
                      <div className="relative border">
                        <Input type="date" {...field} />
                        <ResetButton
                          onClick={() => {
                            form.reset({
                              ...form.getValues(),
                              maxDate: "",
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
