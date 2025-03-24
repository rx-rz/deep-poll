// LinearScaleQuestionOptions.tsx
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
import { useLinearScaleQuestionOptionsForm } from "../form/linearscaleinput-form";

type LocalQuestionOptions = QuestionOptionsMap["linear_scale"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const LinearScaleQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const defaultValues = {
      min: questionOptions?.min ?? 0,
      max: questionOptions?.max ?? 100,
      labels: {
        start: questionOptions?.labels?.start ?? "",
        end: questionOptions?.labels?.end ?? "",
      },
    };

    const { form, onSubmit } = useLinearScaleQuestionOptionsForm({
      questionOptions: defaultValues,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 mb-4">
            <FormField
              control={control}
              name="min"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">Minimum Value</Label>
                  <FormControl>
                    <Input
                      type="number"
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
              name="max"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">Maximum Value</Label>
                  <FormControl>
                    <Input
                      type="number"
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
              name="labels.start"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">Start Label</Label>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="labels.end"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">End Label</Label>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-4" type="submit" disabled={!isDirty}>
            Save
          </Button>
        </form>
      </Form>
    );
  }
);
