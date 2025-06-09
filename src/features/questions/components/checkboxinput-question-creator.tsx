import { Question } from "@/types/questions";
import { memo } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OptionsButton } from "./options-button";
import { QuestionOptionLabel } from "./question-option-label";
import { useCheckboxQuestionCreationForm } from "../form/checkboxinput-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  question: Question<"checkbox">;
};

export const CheckboxInputQuestionCreator = memo(({ question }: Props) => {

  const { form, onSubmit } = useCheckboxQuestionCreationForm({
    question,
  });

  const { control, formState, setValue, watch, getValues } = form;
  const { isDirty } = formState;
  const choices = watch("options.choices");

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 mb-4">
          <FormField
            control={control}
            name="questionText"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Question Text" />
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border  mb-4 p-4 shadow-xs mt-4">
            <div className="flex justify-between mb-2">
              <Label className="text-xs">Choices</Label>
              <Button
                size={"sm"}
                className="text-xs border-none mt-1 w-fit bg-primary rounded-md overflow-hidden"
                onClick={() => {
                  setValue("options.choices", [...choices, ""], {
                    shouldDirty: true,
                  });
                }}
              >
                <Plus size={19} />
              </Button>
            </div>
            <div className="mt-4">
              {getValues("options.choices")?.map((_, index) => (
                <FormField
                  key={index}
                  control={control}
                  name={`options.choices.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2  mb-4">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`Choice ${index + 1}`}
                            {...field}
                          />
                        </FormControl>
                        <Button
                          variant="destructive"
                          className=" max-w-[38px]"
                          onClick={() => {
                            const updatedChoices = getValues(
                              "options.choices"
                            )!.filter((_, i) => i !== index);
                            setValue("options.choices", updatedChoices, {
                              shouldDirty: true,
                            });
                          }}
                        >
                          <Trash2 stroke="#fff" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <FormField
            control={control}
            name="options.minSelections"
            render={({ field }) => (
              <FormItem>
                <Label className="text-xs">Minimum Selections</Label>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="options.maxSelections"
            render={({ field }) => (
              <FormItem>
                <Label className="text-xs">Maximum Selections</Label>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={choices.length}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="options.randomizeOrder"
            render={({ field }) => (
              <FormItem className="flex items-center bg-muted gap-2 border p-4 my-4 justify-between">
                <Label className="text-xs">Randomize Order of Choices</Label>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <OptionsButton disabled={!isDirty} type="submit">
            Save
          </OptionsButton>
        </div>
      </form>
    </Form>
  );
});
