import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { timeFormats } from "@/features/questions-creator/form/timeinput-form";
import customParseFormat from "dayjs/plugin/customParseFormat";

type TimeAnswerProps = {
  id: string;
  questionText: string;
  options: QuestionOptionsMap["time"];
  required: boolean;
  control: Control<any>;
};

export const TimeAnswer = ({
  id,
  options,
  control,
}: TimeAnswerProps) => {
  const { format } = options;
  dayjs.extend(customParseFormat);
  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative ">
              <Input
                type="time"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
              <p className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium">
                {field.value
                  ? `Shown as ${dayjs(field.value).format(timeFormats[format])}`
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
