import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/store/questions.store";

type LocalQuestionOptions = QuestionOptionsMap["rating"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const RatingQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] = useState({
      min: questionOptions?.min ?? 1,
      max: questionOptions?.max ?? 5,
      labels: questionOptions?.labels ?? ["Poor", "Excellent"],
    });

    const { min, max, labels } = localQuestionOptions;

    const updateQuestionConfig = (
      key: keyof typeof localQuestionOptions,
      value: any
    ) => {
      setLocalQuestionOptions((prev) => ({ ...prev, [key]: value }));
    };

    const updateLabel = (index: number, value: string) => {
      const updatedLabels = [...labels];
      updatedLabels[index] = value;
      updateQuestionConfig("labels", updatedLabels);
    };

    const addLabel = () => {
      updateQuestionConfig("labels", [...labels, ""]);
    };

    const removeLabel = (index: number) => {
      const updatedLabels = labels.filter((_, i) => i !== index);
      updateQuestionConfig("labels", updatedLabels);
    };

    const isModified = Object.keys(localQuestionOptions).some(
      (key) =>
        JSON.stringify(
          localQuestionOptions[key as keyof LocalQuestionOptions]
        ) !== JSON.stringify(questionOptions[key as keyof LocalQuestionOptions])
    );

    return (
      <>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-xs">Minimum Rating</Label>
            <Input
              type="number"
              value={min}
              onChange={(e) => {
                const value = Number(e.target.value);
                updateQuestionConfig("min", value);
              }}
            />
          </div>
          <div>
            <Label className="text-xs">Maximum Rating</Label>
            <Input
              type="number"
              value={max}
              onChange={(e) => {
                const value = Number(e.target.value);
                updateQuestionConfig("max", value);
              }}
            />
          </div>
        </div>

        <div>
          <Label className="text-xs">Rating Labels</Label>
          {labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                type="text"
                value={label}
                placeholder={`Label for Rating ${index + 1}`}
                onChange={(e) => updateLabel(index, e.target.value)}
              />
              <Button
                variant="destructive"
                onClick={() => removeLabel(index)}
                disabled={labels.length <= 2} // At least two labels should be present
              >
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addLabel}>
            Add Label
          </Button>
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
