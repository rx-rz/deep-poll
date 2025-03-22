import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/store/questions.store";

type LocalQuestionOptions = QuestionOptionsMap["time"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const TimeQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] = useState({
      format: questionOptions?.format ?? "HH:mm",
      minTime: questionOptions?.minTime ?? "",
      maxTime: questionOptions?.maxTime ?? "",
    });

    const { format, minTime, maxTime } = localQuestionOptions;

    const updateQuestionConfig = (
      key: keyof typeof localQuestionOptions,
      value: string
    ) => {
      setLocalQuestionOptions((prev) => ({ ...prev, [key]: value }));
    };

    const isModified = JSON.stringify(localQuestionOptions) !== JSON.stringify(questionOptions);

    return (
      <>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-xs">Time Format</Label>
            <Input
              type="text"
              value={format}
              placeholder="e.g., HH:mm"
              onChange={(e) => updateQuestionConfig("format", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs">Minimum Time</Label>
            <Input
              type="time"
              value={minTime}
              onChange={(e) => updateQuestionConfig("minTime", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs">Maximum Time</Label>
            <Input
              type="time"
              value={maxTime}
              onChange={(e) => updateQuestionConfig("maxTime", e.target.value)}
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
