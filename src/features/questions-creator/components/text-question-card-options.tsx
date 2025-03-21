import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type LocalQuestionOptions = {
  minLength: number;
  maxLength: number;
  required: boolean;
};

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const TextQuestionCardOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [minLength, setMinLength] = useState(questionOptions?.minLength ?? 1);
    const [maxLength, setMaxLength] = useState(
      questionOptions?.maxLength ?? 255
    );
    const [isRequired, setIsRequired] = useState(
      questionOptions?.required ?? true
    );

    const initialOptions = {
      minLength: questionOptions?.minLength ?? 1,
      maxLength: questionOptions?.maxLength ?? 255,
      required: questionOptions?.required ?? true,
    };

    // Determine if any option has changed
    const isModified =
      minLength !== initialOptions.minLength ||
      maxLength !== initialOptions.maxLength ||
      isRequired !== initialOptions.required;

    return (
      <>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
          <div>
            <Label className=" text-xs">Minimum Question Length</Label>
            <Input
              type="number"
              defaultValue={minLength}
              onChange={(e) => {
                setMinLength(Number(e.target.value));
              }}
            />
          </div>
          <div>
            <Label className=" text-xs">Maximum Question Length</Label>
            <Input
              defaultValue={maxLength}
              type="number"
              onChange={(e) => {
                setMaxLength(Number(e.target.value));
              }}
            />
          </div>
          <div className="w-full  text-xs flex items-center gap-4 ">
            <div className="flex justify-between gap-2">
              <p className="font-medium">Required</p>
              <Switch
                className="w-8 h-4 hover:cursor-pointer"
                checked={isRequired}
                onCheckedChange={(checked) => {
                  setIsRequired(checked);
                }}
              />
            </div>
          </div>
        </div>

        <Button
          className="w-full"
          disabled={!isModified}
          onClick={() => {
            setQuestionOptions({
              minLength,
              maxLength,
              required: isRequired,
            });
          }}
        >
          Save
        </Button>
      </>
    );
  }
);
