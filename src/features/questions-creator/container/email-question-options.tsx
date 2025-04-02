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
import { useEmailQuestionOptionsForm } from "../form/emailinput-form";
import { QuestionOptionsMap } from "@/types/questions";
import { QuestionOptionLabel } from "../components/question-option-label";
import { OptionsButton } from "../components/options-button";
import { Checkbox } from "@/components/ui/checkbox";

type LocalQuestionOptions = QuestionOptionsMap["email"];

type OptionProps = {
  questionOptions: LocalQuestionOptions;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LocalQuestionOptions>
  >;
};

export const EmailQuestionOptions = memo(
  ({ questionOptions, setQuestionOptions }: OptionProps) => {
    const { form, onSubmit } = useEmailQuestionOptionsForm({
      questionOptions,
      setQuestionOptions,
    });

    const { control, formState, watch } = form;
    const { isDirty } = formState;

    const [allowedDomainsList, disallowedDomainList] = [
      watch("allowedDomains"),
      watch("disallowedDomains"),
    ];

    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <FormField
              control={control}
              name="minEmailLength"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Minimum Email Length" />
                  <FormControl>
                    <Input
                      type="text"
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
              name="maxEmailLength"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Maximum Email Length" />
                  <FormControl>
                    <Input
                      type="text"
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
              name="placeholder"
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
              name="allowedDomains"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Allowed Domains" />
                  <FormControl>
                    <Input
                      type="text"
                      disabled={disallowedDomainList!.trim().length > 0}
                      placeholder={
                        form.getValues("disallowedDomains")?.length ?? 0 > 0
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
              name="disallowedDomains"
              render={({ field }) => (
                <FormItem>
                  <QuestionOptionLabel text="Disallowed Domains" />
                  <FormControl>
                    <Input
                      type="text"
                      disabled={allowedDomainsList!.trim().length > 0}
                      placeholder={
                        form.getValues("allowedDomains")?.length ?? 0 > 0
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
              name="allowDuplicates"
              render={({ field }) => (
                <div className="flex items-center border-2 rounded-md p-4 justify-between gap-2 mt-5 mb-4">
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
  }
);
