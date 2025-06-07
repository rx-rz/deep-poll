import { Question } from "@/types/questions";
import { memo } from "react";
import { useEmailQuestionCreationForm } from "../form/emailinput-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { QuestionOptionLabel } from "./question-option-label";
import { Checkbox } from "@/components/ui/checkbox";
import { OptionsButton } from "./options-button";
import { ResetButton } from "./reset-button";
import { defaultQuestionOptions } from "@/lib/default-question-options";

type Props = {
  question: Question<"email">;
};

export const EmailInputQuestionCreator = memo(({ question }: Props) => {
  const { form, onSubmit } = useEmailQuestionCreationForm({
    question,
  });

  const options = defaultQuestionOptions.email;

  const { control, formState, watch, reset } = form;
  const { isDirty } = formState;

  const [allowedDomainsList, disallowedDomainList] = [
    watch("options.allowedDomains"),
    watch("options.disallowedDomains"),
  ];

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
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
            name="options.minEmailLength"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Minimum Email Length" />
                <FormControl>
                  <div className="flex">
                    <Input
                      {...field}
                      min={3}
                      inputMode="decimal"
                      type="number"
                    />
                    <ResetButton
                      disabled={isDirty === false}
                      onClick={() => {
                        reset({
                          options: { minEmailLength: options.minEmailLength },
                        });
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="options.maxEmailLength"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Maximum Email Length" />
                <FormControl>
                  <div className="flex">
                    <Input
                      {...field}
                      inputMode="decimal"
                      type="number"
                      min={form.getValues("options.minEmailLength")}
                    />
                    <ResetButton
                      disabled={isDirty === false}
                      onClick={() => {
                        reset({
                          options: { minEmailLength: options.minEmailLength },
                        });
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="options.placeholder"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Question Placeholder" />
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="options.allowedDomains"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Allowed Domains" />
                <FormControl>
                  <Input
                    type="text"
                    disabled={disallowedDomainList!.trim().length > 0}
                    placeholder={
                      form.getValues("options.disallowedDomains")?.length ??
                      0 > 0
                        ? "Every other domain will be allowed"
                        : ""
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="options.disallowedDomains"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Disallowed Domains" />
                <FormControl>
                  <Input
                    type="text"
                    disabled={allowedDomainsList!.trim().length > 0}
                    placeholder={
                      form.getValues("options.allowedDomains")?.length ?? 0 > 0
                        ? "Every other domain will be disallowed"
                        : ""
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="options.allowDuplicates"
            render={({ field }) => (
              <div className="flex items-center border bg-muted rounded-md p-4 justify-between gap-2 mt-5 mb-4">
                <Label className="text-xs">Allow Duplicates</Label>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />

                <FormMessage />
              </div>
            )}
          />
          <OptionsButton type="submit" disabled={!isDirty}>
            Save
          </OptionsButton>
        </div>
      </form>
    </Form>
  );
});
