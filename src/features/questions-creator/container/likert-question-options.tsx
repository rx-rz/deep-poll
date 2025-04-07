import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/types/questions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useLikertQuestionOptionsForm } from "../form/likertinput-form";
import { Plus, Trash2Icon } from "lucide-react";
import { QuestionOptionLabel } from "../components/question-option-label";

type LocalQuestionOptions = QuestionOptionsMap["likert"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const LikertQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useLikertQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control, formState, watch, setValue } = form;
    const { isDirty } = formState;
    const scaleValue = watch("scale");
    const labelsValue = watch("labels");

    const addLabel = () => {
      if (labelsValue.length < scaleValue) {
        setValue("labels", [...labelsValue, ""]);
      }
    };

    const removeLabel = (index: number) => {
      const updatedLabels = labelsValue.filter((_, i) => i !== index);
      setValue("labels", updatedLabels);
    };

    const updateLabel = (index: number, value: string) => {
      const updatedLabels = [...labelsValue];
      updatedLabels[index] = value;
      setValue("labels", updatedLabels);
    };

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className=" gap-4 mb-4">
            <div>
              <FormField
                control={control}
                name="scale"
                render={({ field }) => (
                  <FormItem>
                    <QuestionOptionLabel text="Scale (Number Of Points)" />
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="border p-4 rounded-md mb-4">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-xs">Labels for Each Point</Label>
              <Button
                className="text-xs border-none mt-1 w-fit bg-gradient-to-br from-blue-500 to-blue-700 rounded-md overflow-hidden shadow-lg"
                onClick={addLabel}
                disabled={labelsValue.length >= scaleValue}
              >
                <Plus size={19} />
              </Button>
            </div>
            {Array.from({ length: scaleValue }, (_, i) => i).map(
              (_, index) => (
                <div key={index} className="flex items-center gap-2 mb-4">
                  <Input
                    type="text"
                    value={labelsValue[index]}
                    placeholder={`Label for Point ${index + 1}`}
                    onChange={(e) => updateLabel(index, e.target.value)}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => removeLabel(index)}
                    disabled={labelsValue.length <= 2}
                  >
                    <Trash2Icon stroke="#fff" />
                  </Button>
                </div>
              )
            )}
          </div>

          <Button className="w-full mt-4" type="submit" disabled={!isDirty}>
            Save
          </Button>
        </form>
      </Form>
    );
  }
);
