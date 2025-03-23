import { memo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/store/questions.store";

type LocalQuestionOptions = QuestionOptionsMap["email"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};
export const EmailQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const [localQuestionOptions, setLocalQuestionOptions] =
      useState<LocalQuestionOptions>({
        minLength: questionOptions?.minLength ?? 1,
        maxLength: questionOptions?.maxLength ?? 255,
        placeholder: questionOptions?.placeholder ?? "",
        allowedDomains: questionOptions?.allowedDomains ?? [],
        disallowedDomains: questionOptions?.disallowedDomains ?? [],
        allowDuplicates: questionOptions?.allowDuplicates ?? true,
      });

    const isModified = Object.keys(localQuestionOptions).some(
      (key) =>
        JSON.stringify(
          localQuestionOptions[key as keyof LocalQuestionOptions]
        ) !== JSON.stringify(questionOptions[key as keyof LocalQuestionOptions])
    );

    const updateQuestionConfig = (
      key: keyof typeof localQuestionOptions,
      value: any
    ) => {
      setLocalQuestionOptions((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
          <div>
            <Label className="text-xs">Minimum Question Length</Label>
            <Input
              type="number"
              value={localQuestionOptions.minLength}
              onChange={(e) =>
                updateQuestionConfig("minLength", Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="text-xs">Maximum Question Length</Label>
            <Input
              type="number"
              value={localQuestionOptions.maxLength}
              onChange={(e) =>
                updateQuestionConfig("maxLength", Number(e.target.value))
              }
            />
          </div>
          <div>
            <Label className="text-xs">Question Placeholder</Label>
            <Input
              type="text"
              max={300}
              value={localQuestionOptions.placeholder}
              onChange={(e) => {
                updateQuestionConfig("placeholder", e.target.value);
              }}
            />
          </div>
          <div>
            <Label className="text-xs">Allowed Domains</Label>
            <Input
              type="text"
              placeholder="e.g., gmail.com, yahoo.com"
              defaultValue={localQuestionOptions.allowedDomains.join(", ")}
              onChange={(e) => {
                updateQuestionConfig("allowedDomains", [
                  ...questionOptions.allowedDomains,
                  ...e.target.value.split(","),
                ]);
              }}
            />
          </div>
          <div>
            <Label className="text-xs">Disallowed Domains</Label>
            <Input
              type="text"
              placeholder="e.g., spam.com, example.com"
              defaultValue={localQuestionOptions.disallowedDomains.join(", ")}
              onChange={(e) => {
                updateQuestionConfig("disallowedDomains", [
                  ...questionOptions.disallowedDomains,
                  ...e.target.value.split(","),
                ]);
              }}
            />
          </div>
        </div>

        <div className=" flex text-xs gap-2 mb-5">
          <Switch
            className="w-8 h-4 hover:cursor-pointer"
            checked={localQuestionOptions.allowDuplicates}
            onCheckedChange={(checked) => {
              updateQuestionConfig("allowDuplicates", checked);
            }}
          />
          <p className="font-medium">Allow Duplicates</p>
        </div>
        <Button
          className="w-full"
          disabled={!isModified}
          onClick={() => {
            setQuestionOptions(localQuestionOptions);
          }}
        >
          Save
        </Button>
      </>
    );
  }
);
