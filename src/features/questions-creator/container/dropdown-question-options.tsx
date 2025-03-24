import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { QuestionOptionsMap } from "@/types/questions";

type LocalQuestionOptions = QuestionOptionsMap["dropdown"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const DropdownQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] = useState({
      choices: questionOptions?.choices ?? [""],
      allowSearch: questionOptions?.allowSearch ?? false,
    });

    const { choices, allowSearch } = localQuestionOptions;

    const updateQuestionConfig = (
      key: keyof typeof localQuestionOptions,
      value: any
    ) => {
      setLocalQuestionOptions((prev) => ({ ...prev, [key]: value }));
    };

    const updateChoice = (index: number, value: string) => {
      const updatedChoices = [...choices];
      updatedChoices[index] = value;
      updateQuestionConfig("choices", updatedChoices);
    };

    const addChoice = () => {
      updateQuestionConfig("choices", [...choices, ""]);
    };

    const removeChoice = (index: number) => {
      const updatedChoices = choices.filter((_, i) => i !== index);
      updateQuestionConfig("choices", updatedChoices);
    };

    const isModified = Object.keys(localQuestionOptions).some(
      (key) =>
        JSON.stringify(
          localQuestionOptions[key as keyof LocalQuestionOptions]
        ) !== JSON.stringify(questionOptions[key as keyof LocalQuestionOptions])
    );

    return (
      <>
        <div className="grid gap-4 mb-4">
          <div>
            <Label className="text-xs">Dropdown Choices</Label>
            {choices.map((choice, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  type="text"
                  value={choice}
                  placeholder={`Choice ${index + 1}`}
                  onChange={(e) => updateChoice(index, e.target.value)}
                />
                <Button
                  variant="destructive"
                  onClick={() => removeChoice(index)}
                  disabled={choices.length <= 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outline" className="text-xs" onClick={addChoice}>
              Add Choice
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={allowSearch}
              onCheckedChange={(value) =>
                updateQuestionConfig("allowSearch", value)
              }
            />
            <Label className="text-xs">Allow Search in Dropdown</Label>
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
