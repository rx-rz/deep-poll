import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type LocalQuestionOptions = {
  minLength: number;
  maxLength: number;
  required: boolean;
  placeholder: string;
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
    const [placeholder, setPlaceholder] = useState(
      questionOptions?.placeholder ?? ""
    );
    const [isRequired, setIsRequired] = useState(
      questionOptions?.required ?? true
    );

    const initialOptions = {
      minLength: questionOptions?.minLength ?? 1,
      maxLength: questionOptions?.maxLength ?? 255,
      required: questionOptions?.required ?? true,
      placeholder: questionOptions?.placeholder ?? "",
    };

    const isModified =
      minLength !== initialOptions.minLength ||
      maxLength !== initialOptions.maxLength ||
      isRequired !== initialOptions.required ||
      placeholder !== initialOptions.placeholder;

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
              value={maxLength}
              type="number"
              onChange={(e) => {
                setMaxLength(Number(e.target.value));
              }}
            />
          </div>
          <div>
            <Label className=" text-xs">Question Placeholder</Label>
            <Input
              value={placeholder}
              type="text"
              max={300}
              onChange={(e) => {
                setPlaceholder(e.target.value);
              }}
            />
            <div className="w-fit mt-4 flex text-xs gap-2">
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
              placeholder,
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
