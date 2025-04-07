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
import { dateFormats } from "@/features/questions-creator/form/dateinput-form";

type DateAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["date"];
  required: boolean;
  control: Control<any>;
};

export const DateAnswer = ({
  questionId,
  control,
  options,
}: DateAnswerProps) => {
  const { format } = options;
  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative ">
              <Input
                type="date"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
              <p className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium">
                Shown as {" "}
                {field.value
                  ? dayjs(field.value).format(dateFormats[format])
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
