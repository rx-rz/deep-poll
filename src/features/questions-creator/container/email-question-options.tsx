// EmailQuestionOptions.tsx
import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEmailQuestionOptionsForm } from "../form/emailinput-form";
import { QuestionOptionsMap } from "@/types/questions";

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
          <div className="grid gap-x-4 gap-y-4 mb-4">
            <FormField
              control={control}
              name="minEmailLength"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">Minimum Email Length</Label>
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
              name="maxEmailLength"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">Maximum Email Length</Label>
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
              name="placeholder"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs">Question Placeholder</Label>
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
                  <Label className="text-xs">Allowed Domains</Label>
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
                  <Label className="text-xs">Disallowed Domains</Label>
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
          </div>

          <div className="flex text-xs gap-2 mb-5">
            <FormField
              control={control}
              name="allowDuplicates"
              render={({ field }) => (
                <>
                  <Switch
                    className="w-8 h-4 hover:cursor-pointer"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <p className="font-medium">Allow Duplicates</p>
                </>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={!isDirty}>
            Save
          </Button>
        </form>
      </Form>
    );
  }
);
