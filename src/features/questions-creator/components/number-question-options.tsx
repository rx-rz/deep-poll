import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { QuestionOptionsMap } from "@/store/questions.store";

type LocalQuestionOptions = QuestionOptionsMap["number"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const NumberQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] = useState({
      placeholder: questionOptions?.placeholder ?? "",
      allowDecimal: questionOptions?.allowDecimal ?? false,
      min: questionOptions?.min ?? 0,
      max: questionOptions?.max ?? Infinity,
    });

    const { placeholder, allowDecimal, min, max } = localQuestionOptions;

    const updateQuestionConfig = (
      key: keyof typeof localQuestionOptions,
      value: any
    ) => {
      setLocalQuestionOptions((prev) => ({ ...prev, [key]: value }));
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
            <Label className="text-xs">Minimum Value</Label>
            <Input
              type="number"
              value={min}
              onChange={(e) =>
                updateQuestionConfig("min", Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="text-xs">Maximum Value</Label>
            <Input
              type="number"
              min={min}
              value={max}
              onChange={(e) =>
                updateQuestionConfig("max", Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="text-xs">Placeholder</Label>
            <Input
              type="text"
              value={placeholder}
              onChange={(e) =>
                updateQuestionConfig("placeholder", e.target.value)
              }
            />
          </div>
          <div>
            <p className="font-medium text-xs mb-2">Allow Decimals</p>
            <Switch
              className="w-8 h-4 hover:cursor-pointer"
              checked={allowDecimal}
              onCheckedChange={(value) =>
                updateQuestionConfig("allowDecimal", value)
              }
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
