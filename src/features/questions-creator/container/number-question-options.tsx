// NumberQuestionOptions.tsx
import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useNumberQuestionOptionsForm } from "../form/numberinput-form";
import { QuestionOptionsMap } from "@/store/questions.store";

type LocalQuestionOptions = QuestionOptionsMap["number"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const NumberQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useNumberQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control, formState } = form;
    const { isDirty } = formState;

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 mb-4">
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
                      min={form.getValues("min")}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="placeholder"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">Placeholder</Label>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="allowDecimal"
              render={({ field }) => (
                <FormItem>
                  <p className="font-medium text-xs mb-2">Allow Decimals</p>
                  <FormControl>
                    <Switch
                      className="w-8 h-4 hover:cursor-pointer"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full mt-4" disabled={!isDirty} type="submit">
            Save
          </Button>
        </form>
      </Form>
    );
  }
);
