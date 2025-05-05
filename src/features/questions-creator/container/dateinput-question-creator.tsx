import { defaultQuestionOptions } from "@/lib/default-question-options";
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
  dateFormats,
  useDateQuestionCreationForm,
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

type Props = {
  question: Question<"date">;
};

export const DateInputQuestionCreator = memo(({ question }: Props) => {
  const questionSettings = {
    questionText: question.questionText ?? "",
    options: question.options ?? defaultQuestionOptions.date,
  };

  const { form, onSubmit } = useDateQuestionCreationForm({
    question: questionSettings,
    id: question.id,
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
              name="options.minDate"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Minimum Date" />
                  <FormControl className="border">
                    <div className="relative border">
                      <Input type="date" {...field} />
                      <ResetButton
                        onClick={() => {
                          reset({
                            ...form.getValues(),
                            options: {
                              ...form.getValues().options,
                              minDate: "",
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
              name="options.maxDate"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Maximum Date" />
                  <FormControl>
                    <div className="relative border">
                      <Input type="date" {...field} />
                      <ResetButton
                        onClick={() => {
                          reset({
                            ...form.getValues(),
                            options: {
                              ...form.getValues().options,
                              maxDate: "",
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
