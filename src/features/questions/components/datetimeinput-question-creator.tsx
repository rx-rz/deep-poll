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
  dateTimeFormats,
  useDateTimeQuestionCreationForm,
} from "../form/datetimeinput-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionOptionLabel } from "./question-option-label";
import { OptionsButton } from "./options-button";
import { ResetButton } from "./reset-button";

type Props = {
  question: Question<"datetime">;
};

export const DateTimeInputQuestionCreator = memo(({ question }: Props) => {
  const { form, onSubmit } = useDateTimeQuestionCreationForm({
    question,
  });

  const { control, formState, reset } = form;
  const { isDirty } = formState;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 mb-4">
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
                    <QuestionOptionLabel text="Datetime Format" />
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a datetime format to display" />
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
              name="options.minDatetime"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Minimum Datetime" />
                  <FormControl>
                    <div className="flex">
                      <Input {...field} type="datetime-local" />
                      <ResetButton
                        disabled={isDirty === false}
                        onClick={() => {
                          reset({
                            ...form.getValues(),
                            options: {
                              ...form.getValues("options"),
                              minDatetime: "",
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
              name="options.maxDatetime"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Maximum Datetime" />
                  <FormControl>
                    <div className="flex">
                      <Input {...field} type="datetime-local" />
                      <ResetButton
                        disabled={isDirty === false}
                        onClick={() => {
                          reset({
                            ...form.getValues(),
                            options: {
                              ...form.getValues("options"),
                              maxDatetime: "",
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
