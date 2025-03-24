// MultipleChoiceQuestionOptions.tsx
import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMultipleChoiceQuestionOptionsForm } from "../form/multiplechoiceinput-form";
import { QuestionOptionsMap } from "@/types/questions";
import { Trash2Icon } from "lucide-react";

type LocalQuestionOptions = QuestionOptionsMap["multiple_choice"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const MultipleChoiceQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useMultipleChoiceQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control, watch, setValue, formState } = form;
    const { isDirty } = formState;
    const choices = watch("choices");

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 mb-4">
            <FormField
              control={control}
              name="choices"
              render={() => (
                <FormItem>
                  <Label className="text-xs">Choices</Label>
                  {choices.map((choice, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Input
                        type="text"
                        value={choice}
                        placeholder={`Choice ${index + 1}`}
                        onChange={(e) => {
                          const updatedChoices = [...choices];
                          updatedChoices[index] = e.target.value;
                          setValue("choices", updatedChoices, {
                            shouldDirty: true,
                          });
                        }}
                      />
                      <Button
                        variant="destructive"
                        onClick={() => {
                          const updatedChoices = choices.filter(
                            (_, i) => i !== index
                          );
                          setValue("choices", updatedChoices, {
                            shouldDirty: true,
                          });
                        }}
                        disabled={choices.length === 1}
                      >
                        <Trash2Icon stroke="#fff" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="text-xs mt-1"
                    onClick={() =>
                      setValue("choices", [...choices, ""], {
                        shouldDirty: true,
                      })
                    }
                  >
                    Add Choice
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="allowOther"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="text-xs">Allow "Other" Option</Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="randomizeOrder"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="text-xs">
                      Randomize Order of Choices
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full mt-4" disabled={!isDirty} type="submit">
            Save
          </Button>
        </form>
      </Form>
    );
  }
);
