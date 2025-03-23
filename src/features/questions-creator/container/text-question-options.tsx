import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/store/questions.store";

type LocalQuestionOptions = QuestionOptionsMap["text"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const TextQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] = useState({
      minLength: questionOptions?.minLength ?? 1,
      maxLength: questionOptions?.maxLength ?? 255,
      placeholder: questionOptions?.placeholder ?? "",
    });

    const { maxLength, minLength, placeholder } = localQuestionOptions;

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
            <Label className="text-xs mb-2">Minimum Answer Length</Label>
            <Input
              type="number"
              defaultValue={minLength}
              onChange={(e) => {
                updateQuestionConfig("minLength", Number(e.target.value));
              }}
            />
          </div>
          <div>
            <Label className=" text-xs mb-2">Maximum Answer Length</Label>
            <Input
              value={maxLength}
              type="number"
              onChange={(e) => {
                updateQuestionConfig("maxLength", Number(e.target.value));
              }}
            />
          </div>
          <div>
            <Label className=" text-xs mb-2">Question Placeholder</Label>
            <Input
              value={placeholder}
              type="text"
              max={300}
              onChange={(e) => {
                updateQuestionConfig("placeholder", e.target.value);
              }}
            />
          </div>
        </div>

        <Button
          className="w-full mt-4 font-bold"
          disabled={!isModified}
          onClick={() => {
            setQuestionOptions({ ...localQuestionOptions });
          }}
        >
          SAVE
        </Button>
      </>
    );
  }
);
