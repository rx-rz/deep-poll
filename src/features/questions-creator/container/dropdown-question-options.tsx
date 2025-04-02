import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/types/questions";
import { useDropdownQuestionOptionsForm } from "../form/dropdowninput-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { OptionsButton } from "../components/options-button";

type LocalQuestionOptions = QuestionOptionsMap["dropdown"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const DropdownQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useDropdownQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });
    const { control, watch, getValues } = form;
    const choices = watch("choices");

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 mb-4">
            <div className="p-4 border">
              <div className="flex justify-between items-center mb-4">
                <Label className="text-xs"> Choices</Label>
                <Button
                  className="text-xs border-none mt-1 w-fit bg-gradient-to-br from-blue-500 to-blue-700 rounded-md overflow-hidden shadow-lg"

                  onClick={() => {
                    form.setValue("choices", [...choices, ""], {
                      shouldDirty: true,
                    });
                  }}
                >
                  <Plus size={19} />
                </Button>
              </div>
              {form.getValues("choices").map((_, index) => (
                <div key={index} className="flex items-center w-full gap-2 mb-2">
                  <FormField
                    key={index}
                    control={control}
                    
                    name={`choices.${index}`}
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
                                "choices"
                              ).filter((_, i) => i !== index);
                              form.setValue("choices", updatedChoices);
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
              name="allowSearch"
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

            <OptionsButton

              disabled={!form.formState.isDirty}
            >
              Save
            </OptionsButton>
          </div>
        </form>
      </Form>
    );
  }
);
