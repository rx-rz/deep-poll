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
import { Button } from "@/components/ui/button";
import { Plus, Trash2Icon } from "lucide-react";
import { QuestionOptionLabel } from "./question-option-label";
import { useLikertQuestionCreationForm } from "../form/likertinput-form";
import { Label } from "@/components/ui/label";
import { OptionsButton } from "./options-button";

type Props = {
  question: Question<"likert">;
};

export const LikertInputQuestionCreator = memo(({ question }: Props) => {
  const { form, onSubmit } = useLikertQuestionCreationForm({
    question,
  });

  const { control, formState, watch, setValue } = form;
  const { isDirty } = formState;
  const scaleValue = watch("options.scale");
  const labelsValue = watch("options.labels");

  const addLabel = () => {
    setValue("options.labels", [...labelsValue, ""]);
    setValue("options.scale", labelsValue.length + 1);
  };

  const removeLabel = (index: number) => {
    const updatedLabels = labelsValue.filter((_, i) => i !== index);
    setValue("options.labels", updatedLabels, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("options.scale", updatedLabels.length);
  };

  const updateLabel = (index: number, value: string) => {
    const updatedLabels = [...labelsValue];
    updatedLabels[index] = value;
    setValue("options.labels", updatedLabels);
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className=" gap-4 mb-4">
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
          <div className="mt-4">
            <FormField
              control={control}
              name="options.scale"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Scale (Number Of Points). Max 7" />
                  <FormControl>
                    <Input type="number" max={7} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border four-border mx-1 my-6  p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <Label className="text-xs">Labels for Each Point</Label>
            <Button
              className="text-xs border-none mt-1 w-fit bg-primary rounded-md overflow-hidden"
              onClick={addLabel}
            >
              <Plus size={19} />
            </Button>
          </div>
          {Array.from({ length: scaleValue }, (_, i) => i).map((_, index) => (
            <div key={index} className="flex items-center gap-2 mb-4">
              <Input
                type="text"
                value={labelsValue?.[index] ?? ""}
                placeholder={`Label for Point ${index + 1}`}
                onChange={(e) => updateLabel(index, e.target.value)}
              />
              <Button
                variant="destructive"
                onClick={() => removeLabel(index)}
                disabled={(labelsValue?.length ?? 0) <= 2}
              >
                <Trash2Icon stroke="#fff" />
              </Button>
            </div>
          ))}
        </div>

        <OptionsButton disabled={!isDirty}>Save</OptionsButton>
      </form>
    </Form>
  );
});
