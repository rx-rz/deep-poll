import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/store/questions.store";

type LocalQuestionOptions = QuestionOptionsMap["likert"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const LikertQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] = useState({
      scale: questionOptions?.scale ?? 5,
      labels: questionOptions?.labels ?? [
        "Strongly Disagree",
        "Strongly Agree",
      ],
      statement: questionOptions?.statement ?? "",
    });

    const { scale, labels, statement } = localQuestionOptions;

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
      if (labels.length < scale) {
        updateQuestionConfig("labels", [...labels, ""]);
      }
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
            <Label className="text-xs">Scale (Number of Points)</Label>
            <Input
              type="number"
              value={scale}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 2) {
                  updateQuestionConfig("scale", value);
                  // Adjust labels array to match scale
                  const adjustedLabels = [...labels];
                  if (value > adjustedLabels.length) {
                    while (adjustedLabels.length < value) {
                      adjustedLabels.push("");
                    }
                  } else {
                    adjustedLabels.length = value;
                  }
                  updateQuestionConfig("labels", adjustedLabels);
                }
              }}
            />
          </div>
        </div>

        <div className="mb-4">
          <Label className="text-xs">Statement</Label>
          <Input
            type="text"
            value={statement}
            onChange={(e) => {
              updateQuestionConfig("statement", e.target.value);
            }}
            placeholder="Enter the statement being rated"
          />
        </div>

        <div>
          <Label className="text-xs">Labels for Each Point</Label>
          {labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                type="text"
                value={label}
                placeholder={`Label for Point ${index + 1}`}
                onChange={(e) => updateLabel(index, e.target.value)}
              />
              <Button
                variant="destructive"
                onClick={() => removeLabel(index)}
                disabled={labels.length <= 2} // At least two labels are required
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addLabel}
            disabled={labels.length >= scale} // Prevent adding more labels than the scale
          >
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
