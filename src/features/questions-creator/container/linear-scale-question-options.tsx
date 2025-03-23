import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/store/questions.store";

type LocalQuestionOptions = QuestionOptionsMap["linear_scale"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const LinearScaleQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] = useState({
      min: questionOptions?.min ?? 0,
      max: questionOptions?.max ?? 100,
      labels: {
        start: questionOptions?.labels?.start ?? "",
        end: questionOptions?.labels?.end ?? "",
      },
    });

    const { min, max, labels } = localQuestionOptions;

    const updateQuestionConfig = (
      key: keyof typeof localQuestionOptions,
      value: any
    ) => {
      setLocalQuestionOptions((prev) => ({ ...prev, [key]: value }));
    };

    const updateLabel = (labelKey: keyof typeof labels, value: string) => {
      setLocalQuestionOptions((prev) => ({
        ...prev,
        labels: { ...prev.labels, [labelKey]: value },
      }));
    };

    const isModified = JSON.stringify(localQuestionOptions) !== JSON.stringify(questionOptions);

    return (
      <>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-xs">Minimum Value</Label>
            <Input
              type="number"
              value={min}
              onChange={(e) => updateQuestionConfig("min", Number(e.target.value))}
            />
          </div>
          <div>
            <Label className="text-xs">Maximum Value</Label>
            <Input
              type="number"
              value={max}
              onChange={(e) => updateQuestionConfig("max", Number(e.target.value))}
            />
          </div>
          <div>
            <Label className="text-xs">Start Label</Label>
            <Input
              type="text"
              value={labels.start}
              onChange={(e) => updateLabel("start", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs">End Label</Label>
            <Input
              type="text"
              value={labels.end}
              onChange={(e) => updateLabel("end", e.target.value)}
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
