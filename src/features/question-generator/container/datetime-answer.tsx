import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { dateTimeFormats } from "@/features/questions-creator/form/datetimeinput-form";
import dayjs from "dayjs";

type DateTimeAnswerProps = {
  id: string;
  questionText: string;
  options: QuestionOptionsMap["datetime"];
  required: boolean;
  control: Control<any>;
};

export const DateTimeAnswer = ({
  id,
  options,
  control,
}: DateTimeAnswerProps) => {
  const { format } = options;
  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                type="datetime-local"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
              <p className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium">
                {field.value
                  ? `Shown as ${dayjs(field.value).format(
                      dateTimeFormats[format]
                    )}`
                  : ""}
              </p>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
