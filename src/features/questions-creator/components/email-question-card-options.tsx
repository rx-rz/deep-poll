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
  allowedDomains: string[];
  disallowedDomains: string[];
  allowDuplicates: boolean;
};

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const EmailQuestionCardOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [options, setOptions] = useState<LocalQuestionOptions>({
      minLength: questionOptions?.minLength ?? 1,
      maxLength: questionOptions?.maxLength ?? 255,
      required: questionOptions?.required ?? true,
      placeholder: questionOptions?.placeholder ?? "",
      allowedDomains: questionOptions?.allowedDomains ?? [],
      disallowedDomains: questionOptions?.disallowedDomains ?? [],
      allowDuplicates: questionOptions?.allowDuplicates ?? true,
    });

    const isModified = Object.keys(options).some(
      (key) =>
        JSON.stringify(options[key as keyof LocalQuestionOptions]) !==
        JSON.stringify(questionOptions[key as keyof LocalQuestionOptions])
    );

    return (
      <>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
          <div>
            <Label className="text-xs">Minimum Question Length</Label>
            <Input
              type="number"
              value={options.minLength}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  minLength: Number(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <Label className="text-xs">Maximum Question Length</Label>
            <Input
              type="number"
              value={options.maxLength}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  maxLength: Number(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <Label className="text-xs">Question Placeholder</Label>
            <Input
              type="text"
              max={300}
              value={options.placeholder}
              onChange={(e) => {
                setOptions((prev) => ({
                  ...prev,
                  placeholder: e.target.value,
                }));
              }}
            />
          </div>
          <div>
            <Label className="text-xs">Allowed Domains (comma-separated)</Label>
            <Input
              type="text"
              placeholder="e.g., gmail.com, yahoo.com"
              defaultValue={options.allowedDomains.join(", ")}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  allowedDomains: e.target.value.split(","),
                }))
              }
            />
          </div>
          <div>
            <Label className="text-xs">
              Disallowed Domains (comma-separated)
            </Label>
            <Input
              type="text"
              placeholder="e.g., spam.com, example.com"
              defaultValue={options.disallowedDomains.join(", ")}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  disallowedDomains: e.target.value.split(","),
                }))
              }
            />
          </div>
          <div className="w-full text-xs flex items-center gap-4">
            <div className="flex justify-between gap-2">
              <p className="font-medium">Allow Duplicates</p>
              <Switch
                className="w-8 h-4 hover:cursor-pointer"
                checked={options.allowDuplicates}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({
                    ...prev,
                    allowDuplicates: checked,
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full text-xs flex items-center gap-4">
            <div className="flex justify-between gap-2">
              <p className="font-medium">Required</p>
              <Switch
                className="w-8 h-4 hover:cursor-pointer"
                checked={options.required}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({
                    ...prev,
                    required: checked,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <Button
          className="w-full"
          disabled={!isModified}
          onClick={() => {
            setQuestionOptions(options);
          }}
        >
          Save
        </Button>
      </>
    );
  }
);
