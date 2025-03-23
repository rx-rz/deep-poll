// LikertQuestionOptions.tsx
import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionOptionsMap } from "@/store/questions.store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useLikertQuestionOptionsForm } from "../form/likertinput-form";
import { Trash2Icon } from "lucide-react";

type LocalQuestionOptions = QuestionOptionsMap["likert"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const LikertQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const defaultValues = {
      scale: questionOptions?.scale ?? 5,
      labels: questionOptions?.labels ?? [
        "Strongly Disagree",
        "Strongly Agree",
      ],
      statement: questionOptions?.statement ?? "",
    };

    const { form, onSubmit } = useLikertQuestionOptionsForm({
      questionOptions: defaultValues,
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
              <Label className="text-xs">Scale (Number of Points)</Label>
              <FormField
                control={control}
                name="scale"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mb-4">
            <Label className="text-xs">Statement</Label>
            <FormField
              control={control}
              name="statement"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter the statement being rated"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label className="text-xs">Labels for Each Point</Label>
            {labelsValue.map((label, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  type="text"
                  value={label}
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
            ))}
            <Button
              variant="outline"
              onClick={addLabel}
              disabled={labelsValue.length >= scaleValue}
            >
              Add Label
            </Button>
          </div>

          <Button className="w-full mt-4" type="submit" disabled={!isDirty}>
            Save
          </Button>
        </form>
      </Form>
    );
  }
);
