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
import { QuestionOptionLabel } from "./question-option-label";
import { OptionsButton } from "./options-button";
import { ResetButton } from "./reset-button";
import { format, parse } from "date-fns";

type Props = {
  question: Question<"date">;
};

const formatDatePreview = (dateString: string, formatKey: string): string => {
  if (!dateString) return "";

  try {
    // Parse the date string from the HTML date input (YYYY-MM-DD format)
    const date = parse(dateString, "yyyy-MM-dd", new Date());

    // Get the format string from dateFormats, but convert dayjs format to date-fns format
    const dayjsFormat = dateFormats[formatKey as keyof typeof dateFormats];

    // Convert dayjs format to date-fns format
    const dateFnsFormat = dayjsFormat
      .replace(/YYYY/g, "yyyy")
      .replace(/DD/g, "dd")
      .replace(/MM/g, "MM")
      .replace(/MMMM/g, "MMMM")
      .replace(/D/g, "d");

    // Format using date-fns
    return format(date, dateFnsFormat);
  } catch (error) {
    return dateString; // fallback to original string if parsing fails
  }
};

export const DateInputQuestionCreator = memo(({ question }: Props) => {
  const { form, onSubmit } = useDateQuestionCreationForm({
    question,
  });

  const { control, formState, reset, watch } = form;
  const { isDirty } = formState;

  // Watch the format and date values to update preview
  const selectedFormat = watch("options.format");

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
                    <div className="flex relative">
                      <Input {...field} type="date" />
                      {field.value && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-white p-2 pointer-events-none">
                          Displayed as{" "}
                          {formatDatePreview(field.value, selectedFormat)}
                        </div>
                      )}
                      <ResetButton
                        disabled={isDirty === false}
                        onClick={() => {
                          reset({
                            ...form.getValues(),
                            options: {
                              ...form.getValues("options"),
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
                    <div className="flex relative">
                      <Input {...field} type="date" />
                      {field.value && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-white p-2 pointer-events-none">
                          Displayed as{" "}
                          {formatDatePreview(field.value, selectedFormat)}
                        </div>
                      )}
                      <ResetButton
                        disabled={isDirty === false}
                        onClick={() => {
                          reset({
                            ...form.getValues(),
                            options: {
                              ...form.getValues("options"),
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
