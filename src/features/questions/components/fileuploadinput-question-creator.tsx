import { Question } from "@/types/questions";
import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { OptionsButton } from "./options-button";
import { QuestionOptionLabel } from "./question-option-label";
import { useFileUploadQuestionCreationForm } from "../form/fileuploadinput-form";

type Props = {
  question: Question<"file">;
};

export const FileUploadInputQuestionCreator = memo(({ question }: Props) => {

  const { form, onSubmit } = useFileUploadQuestionCreationForm({
    question,
  });

  const { control, formState } = form;
  const { isDirty } = formState;

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
          <FormField
            control={control}
            name="options.acceptedFormats"
            render={({ field }) => (
              <FormItem>
                <Label className="text-xs">
                  Accepted Formats (comma-separated)
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    value={(field.value as string[])?.join(", ") || ""}
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
            name="options.maxSizeMB"
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
            name="options.maxFiles"
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
            name="options.allowMultiple"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="allowMultiple">Allow Multiple Files</Label>
                </div>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <OptionsButton type="submit" disabled={!isDirty}>
          Save
        </OptionsButton>
      </form>
    </Form>
  );
});
