import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/store/questions.store";

type LocalQuestionOptions = QuestionOptionsMap["date"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const DateQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] =
      useState<LocalQuestionOptions>({
        format: questionOptions?.format ?? "yyyy-MM-dd",
        minDate: questionOptions?.minDate ?? "",
        maxDate: questionOptions?.maxDate ?? "",
        allowPastDates: questionOptions?.allowPastDates ?? "",
      });

    const { format, minDate, maxDate } = localQuestionOptions;

    const updateQuestionConfig = (
      key: keyof typeof localQuestionOptions,
      value: string
    ) => {
      setLocalQuestionOptions((prev) => ({ ...prev, [key]: value }));
    };

    const isModified =
      JSON.stringify(localQuestionOptions) !== JSON.stringify(questionOptions);

    return (
      <>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-xs">Date Format</Label>
            <Input
              type="text"
              value={format}
              placeholder="e.g., yyyy-MM-dd"
              onChange={(e) => updateQuestionConfig("format", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs">Minimum Date</Label>
            <Input
              type="date"
              value={minDate}
              onChange={(e) => updateQuestionConfig("minDate", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs">Maximum Date</Label>
            <Input
              type="date"
              value={maxDate}
              onChange={(e) => updateQuestionConfig("maxDate", e.target.value)}
            />
          </div>
        </div>

        <Button
          className="w-full mt-4"
          disabled={!isModified}
          onClick={() => {
            setQuestionOptions({ ...localQuestionOptions });
          }}
        >
          Save
        </Button>
      </>
    );
  }
);
