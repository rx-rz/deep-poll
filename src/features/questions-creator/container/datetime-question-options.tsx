import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/store/questions.store";

type LocalQuestionOptions = QuestionOptionsMap["datetime"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const DateTimeQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] = useState({
      format: questionOptions?.format ?? "yyyy-MM-dd HH:mm",
      minDatetime: questionOptions?.minDatetime ?? "",
      maxDatetime: questionOptions?.maxDatetime ?? "",
    });

    const { format, minDatetime, maxDatetime } = localQuestionOptions;

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
            <Label className="text-xs">DateTime Format</Label>
            <Input
              type="text"
              value={format}
              placeholder="e.g., yyyy-MM-dd HH:mm"
              onChange={(e) => updateQuestionConfig("format", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs">Minimum DateTime</Label>
            <Input
              type="datetime-local"
              value={minDatetime}
              onChange={(e) => updateQuestionConfig("minDatetime", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs">Maximum DateTime</Label>
            <Input
              type="datetime-local"
              value={maxDatetime}
              onChange={(e) => updateQuestionConfig("maxDatetime", e.target.value)}
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
