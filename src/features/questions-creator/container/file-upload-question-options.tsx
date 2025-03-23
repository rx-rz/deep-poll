// FileUploadOptions.tsx
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

import { QuestionOptionsMap } from "@/store/questions.store";

import { useFileUploadOptionsForm } from "../form/fileuploadinput-form";

type LocalQuestionOptions = QuestionOptionsMap["file"];
type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const FileUploadOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const defaultValues = {
      acceptedFormats: questionOptions?.acceptedFormats ?? ["pdf"],
      maxSizeMB: questionOptions?.maxSizeMB ?? 5,
      maxFiles: questionOptions?.maxFiles ?? 1,
      allowMultiple: questionOptions?.allowMultiple ?? false,
    };

    const { form, onSubmit } = useFileUploadOptionsForm({
      questionOptions: defaultValues,
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
              name="acceptedFormats"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">
                    Accepted Formats (comma-separated)
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value.join(", ")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.split(",").map((item) => item.trim())
                        )
                      }
                      placeholder="e.g., pdf, docx, jpg, png"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="maxSizeMB"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">Max Size (MB)</Label>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="maxFiles"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">Max Files</Label>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="allowMultiple"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowMultiple">Allow Multiple Files</Label>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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
