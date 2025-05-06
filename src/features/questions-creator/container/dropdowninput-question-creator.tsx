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
import { OptionsButton } from "../components/options-button";
import { QuestionOptionLabel } from "../components/question-option-label";
import { useDropdownQuestionCreationForm } from "../form/dropdowninput-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  question: Question<"dropdown">;
};

export const DropdownInputQuestionCreator = memo(({ question }: Props) => {
  const { form, onSubmit } = useDropdownQuestionCreationForm({
    question,
  });

  const { control, formState, setValue, watch, getValues } = form;
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

          <div className="p-4 border">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-xs"> Choices</Label>
              <Button
                className="text-xs border-none mt-1 w-fit bg-gradient-to-br from-blue-500 to-blue-700 rounded-md overflow-hidden shadow-lg"
                onClick={() => {
                  setValue("options.choices", [...choices, ""], {
                    shouldDirty: true,
                  });
                }}
              >
                <Plus size={19} />
              </Button>
            </div>
            {getValues("options.choices")?.map((_, index) => (
              <div key={index} className="flex items-center w-full gap-2 mb-2">
                <FormField
                  key={index}
                  control={control}
                  name={`options.choices.${index}`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="flex items-center gap-2 mb-4">
                        <FormControl>
                          <Input
                            type="text"
                            className="w-full"
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
              </div>
            ))}
          </div>

          <FormField
            control={control}
            name="options.allowSearch"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 border p-4 justify-between">
                <Label className="text-xs">Allow Search</Label>
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
