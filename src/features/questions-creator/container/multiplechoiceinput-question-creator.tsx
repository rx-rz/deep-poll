import { Question } from "@/types/questions";
import { memo } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OptionsButton } from "../components/options-button";
import { QuestionOptionLabel } from "../components/question-option-label";
import { useMultipleChoiceQuestionCreationForm } from "../form/multiplechoiceinput-form";
import { Plus, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  question: Question<"multiple_choice">;
};

export const MultipleChoiceInputQuestionCreator = memo(
  ({ question }: Props) => {
    const { form, onSubmit } = useMultipleChoiceQuestionCreationForm({
      question,
    });

    const { control, watch, setValue, formState } = form;
    const { isDirty } = formState;
    const choices = watch("options.choices");

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 mb-4">
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

            <FormField
              control={control}
              name="options.choices"
              render={() => (
                <FormItem className="border p-4 mt-4 shadow-sm">
                  <div className="flex justify-between mb-2">
                    <Label className="text-xs">Choices</Label>
                    <Button
                      size={"sm"}
                      className="text-xs border-none mt-1 w-fit bg-gradient-to-br from-blue-500 to-blue-700 rounded-md overflow-hidden shadow-lg"
                      onClick={() =>
                        setValue("options.choices", [...choices, ""], {
                          shouldDirty: true,
                        })
                      }
                    >
                      <Plus size={19} />
                    </Button>
                  </div>
                  <FormMessage />
                  {choices.map((choice, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Input
                        type="text"
                        value={choice}
                        placeholder={`Choice ${index + 1}`}
                        onChange={(e) => {
                          const updatedChoices = [...choices];
                          updatedChoices[index] = e.target.value;
                          setValue("options.choices", updatedChoices, {
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
                          setValue("options.choices", updatedChoices, {
                            shouldDirty: true,
                          });
                        }}
                        className="w-fit max-w-[38px]"
                        disabled={choices.length === 1}
                      >
                        <Trash2Icon stroke="#fff" size={18} />
                      </Button>
                    </div>
                  ))}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="options.maxLengthForOtherParameter"
              disabled={form.getValues("options.allowOther") === false}
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Maximum Length For Other Value" />
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="p-4 flex-col my-4 flex gap-6 border rounded-md shadow-xs">
              <FormField
                control={control}
                name="options.allowOther"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between ">
                      <Label className="text-xs">Allow "Other" Option</Label>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="options.randomizeOrder"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between ">
                      <Label className="text-xs">
                        Randomize Order of Choices
                      </Label>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <OptionsButton disabled={!isDirty} type="submit">
              Save
            </OptionsButton>
          </div>
        </form>
      </Form>
    );
  }
);
