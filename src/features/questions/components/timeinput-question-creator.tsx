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
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { format } from "date-fns";

type Props = {
  question: Question<"time">;
};

const formatTimePreview = (timeString: string, formatKey: string): string => {
  if (!timeString) return "";
  
  try {
    // Parse the time string (assuming it's in HH:mm format from the date input)
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // Get the format string from timeFormats
    const formatString = timeFormats[formatKey as keyof typeof timeFormats];
    
    // Format using date-fns
    return format(date, formatString);
  } catch (error) {
    return timeString; // fallback to original string if parsing fails
  }
};

export const TimeInputQuestionCreator = memo(({ question }: Props) => {
  const { form, onSubmit } = useTimeQuestionCreationForm({
    question,
  });

  const { control, formState, reset, watch } = form;
  const { isDirty } = formState;
  const options = defaultQuestionOptions.time;
  
  const selectedFormat = watch("options.format");


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
                    <div className="flex relative">
                      <Input {...field} type="time" />
                      {field.value && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-white p-2 pointer-events-none">
                          Displayed as <strong>{formatTimePreview(field.value, selectedFormat)}</strong>
                        </div>
                      )}
                      <ResetButton
                        disabled={isDirty === false}
                        onClick={() => {
                          reset({
                            options: { minTime: options.minTime },
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
                    <div className="flex relative">
                      <Input {...field} type="time" />
                      {field.value && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 bg-white p-2 pointer-events-none">
                          Displayed as <strong>{formatTimePreview(field.value, selectedFormat)}</strong>
                        </div>
                      )}
                      <ResetButton
                        disabled={isDirty === false}
                        onClick={() => {
                          reset({
                            options: { maxTime: options.maxTime },
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