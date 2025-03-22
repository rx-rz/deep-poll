import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { QuestionOptionsMap } from "@/store/questions.store";
import { Trash2 } from "lucide-react";

type LocalQuestionOptions = QuestionOptionsMap["checkbox"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const CheckboxQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] = useState({
      choices: questionOptions?.choices ?? [""],
      minSelections: questionOptions?.minSelections ?? 0,
      maxSelections: questionOptions?.maxSelections ?? 1,
      randomizeOrder: questionOptions?.randomizeOrder ?? false,
    });

    const { choices, minSelections, maxSelections, randomizeOrder } =
      localQuestionOptions;

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
        <div className="flex flex-col gap-4 mb-4">
          <div>
            <div className="text-xs mb-4 font-medium justify-between w-full">
              <p>Choices</p>
              <Button
                variant="outline"
                className="text-xs mt-1"
                onClick={addChoice}
              >
                Add Choice
              </Button>
            </div>
            <div >
              <div>
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
                    >
                      <Trash2 stroke="#fff" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Minimum Selections</Label>
              <Input
                type="number"
                min={0}
                value={minSelections}
                onChange={(e) =>
                  updateQuestionConfig("minSelections", Number(e.target.value))
                }
              />
            </div>

            <div>
              <Label className="text-xs">Maximum Selections</Label>
              <Input
                type="number"
                min={1}
                value={maxSelections}
                onChange={(e) =>
                  updateQuestionConfig("maxSelections", Number(e.target.value))
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={randomizeOrder}
              onCheckedChange={(value) =>
                updateQuestionConfig("randomizeOrder", value)
              }
            />
            <Label className="text-xs">Randomize Order of Choices</Label>
          </div>
        </div>

        <Button
          className="w-full"
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
