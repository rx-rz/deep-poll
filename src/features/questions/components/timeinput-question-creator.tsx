import { Question } from "@/types/questions";
import { memo } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  timeFormats,
  useTimeQuestionCreationForm,
} from "../form/timeinput-form";
import { QuestionOptionLabel } from "./question-option-label";
import { OptionsButton } from "./options-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResetButton } from "./reset-button";

type Props = {
  question: Question<"time">;
};

export const TimeInputQuestionCreator = memo(({ question }: Props) => {

  const { form, onSubmit } = useTimeQuestionCreationForm({
    question,
  });

  const { control, formState, reset } = form;
  const { isDirty } = formState;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 mb-4">
          <FormField
            control={control}
            name="questionText"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Question Text" />
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={control}
              name="options.format"
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
              name="options.minTime"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Minimum Time" />
                  <FormControl>
                    <div className="relative border">
                      <Input type="time" {...field} />
                      <ResetButton
                        onClick={() => {
                          reset({
                            ...form.getValues(),
                            options: {
                              ...form.getValues().options,
                              minTime: "",
                            },
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
              name="options.maxTime"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Maximum Time" />
                  <FormControl>
                    <div className="relative border">
                      <Input type="time" {...field} />
                      <ResetButton
                        onClick={() => {
                          reset({
                            ...form.getValues(),
                            options: {
                              ...form.getValues().options,
                              maxTime: "",
                            },
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
});
