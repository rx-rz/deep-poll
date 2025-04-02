import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useCheckboxQuestionOptionsForm } from "../form/checboxinput-form";
import { QuestionOptionsMap } from "@/types/questions";
type LocalQuestionOptions = QuestionOptionsMap["checkbox"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const CheckboxQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useCheckboxQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control, watch, getValues } = form;
    const choices = watch("choices");

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 mb-4">
            <div className="border p-4 shadow-xs mt-4">
              <div className="flex justify-between mb-2">
                <Label className="text-xs">Choices</Label>
                <Button
                  size={"sm"}
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
              <div className="mt-4">
                {form.getValues("choices").map((_, index) => (
                  <FormField
                    key={index}
                    control={control}
                    name={`choices.${index}`}
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
                ))}
              </div>
            </div>

            <FormField
              control={control}
              name="minSelections"
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
              name="maxSelections"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">Maximum Selections</Label>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
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
              name="randomizeOrder"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label className="text-xs">Randomize Order of Choices</Label>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isDirty}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    );
  }
);
