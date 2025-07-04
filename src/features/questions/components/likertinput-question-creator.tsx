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
  const scaleValue = watch("options.scale") || 0;
  const labelsValue = watch("options.labels") || [];

  const addLabel = () => {
    const newLabels = [...labelsValue, ""];
    const newScale = newLabels.length;
    
    setValue("options.labels", newLabels, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("options.scale", newScale, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeLabel = (index: number) => {
    const updatedLabels = labelsValue.filter((_, i) => i !== index);
    const newScale = updatedLabels.length;
    
    setValue("options.labels", updatedLabels, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("options.scale", newScale, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const updateLabel = (index: number, value: string) => {
    const updatedLabels = [...labelsValue];
    updatedLabels[index] = value;
    setValue("options.labels", updatedLabels, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Ensure we have the right number of labels to match the scale
  const effectiveLabels = Array.from({ length: Math.max(scaleValue, labelsValue.length) }, (_, i) => 
    labelsValue[i] || ""
  );

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
                    <Input 
                      type="number" 
                      max={7} 
                      min={2}
                      {...field}
                      onChange={(e) => {
                        const newScale = parseInt(e.target.value) || 0;
                        field.onChange(e);
                        
                        // Adjust labels array to match new scale
                        if (newScale > 0) {
                          const adjustedLabels = Array.from({ length: newScale }, (_, i) => 
                            labelsValue[i] || ""
                          );
                          setValue("options.labels", adjustedLabels, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border my-6 p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <Label className="text-xs">Labels for Each Point</Label>
            <Button
              type="button"
              className="text-xs border-none mt-1 w-fit bg-primary rounded-md overflow-hidden"
              onClick={addLabel}
              disabled={scaleValue >= 7}
            >
              <Plus size={19} />
            </Button>
          </div>
          {effectiveLabels.map((label, index) => (
            <div key={index} className="flex items-center gap-2 mb-4">
              <Input
                type="text"
                value={label}
                placeholder={`Label for Point ${index + 1}`}
                onChange={(e) => updateLabel(index, e.target.value)}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeLabel(index)}
                disabled={effectiveLabels.length <= 2}
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