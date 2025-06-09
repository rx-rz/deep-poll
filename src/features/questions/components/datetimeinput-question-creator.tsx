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
import { format, parse } from "date-fns";

type Props = {
  question: Question<"datetime">;
};

const formatDateTimePreview = (
  datetimeString: string,
  formatKey: string
): string => {
  if (!datetimeString) return "";

  try {
    const date = parse(datetimeString, "yyyy-MM-dd'T'HH:mm", new Date());

    const dayjsFormat =
      dateTimeFormats[formatKey as keyof typeof dateTimeFormats];
    const dateFnsFormat = dayjsFormat
      .replace(/YYYY/g, "yyyy")
      .replace(/MM/g, "MM")
      .replace(/DD/g, "dd")
      .replace(/MMMM/g, "MMMM")
      .replace(/MMM/g, "MMM")
      .replace(/D/g, "d")
      .replace(/HH/g, "HH")
      .replace(/mm/g, "mm")
      .replace(/ss/g, "ss")
      .replace(/h/g, "h")
      .replace(/A/g, "a")
      .replace(/<ctrl3348>/g, ""); // Remove the special character

    return format(date, dateFnsFormat);
  } catch (error) {
    return datetimeString; // fallback to original string if parsing fails
  }
};

export const DateTimeInputQuestionCreator = memo(({ question }: Props) => {
  const { form, onSubmit } = useDateTimeQuestionCreationForm({
    question,
  });

  const { control, formState, reset, watch } = form;
  const { isDirty } = formState;

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
                    <div className="flex relative">
                      <Input {...field} type="datetime-local" />
                      {field.value && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-white p-2 pointer-events-none">
                          Displayed as{" "}
                          {formatDateTimePreview(field.value, selectedFormat)}
                        </div>
                      )}
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
                    <div className="flex relative">
                      <Input {...field} type="datetime-local" />
                      {field.value && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-white p-2 pointer-events-none">
                          Displayed as{" "}
                          {formatDateTimePreview(field.value, selectedFormat)}
                        </div>
                      )}
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
