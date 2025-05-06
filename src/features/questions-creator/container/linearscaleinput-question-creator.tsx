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
import { OptionsButton } from "../components/options-button";
import { QuestionOptionLabel } from "../components/question-option-label";
import { useLinearScaleQuestionCreationForm } from "../form/linearscaleinput-form";

type Props = {
  question: Question<"linear_scale">;
};

export const LinearScaleInputQuestionCreator = memo(({ question }: Props) => {
 
  const { form, onSubmit } = useLinearScaleQuestionCreationForm({
    question,
  });

  const { formState, control } = form;
  const { isDirty } = formState;
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 mb-4">
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
            name="options.min"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Minimum Value" />
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
            name="options.max"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Maximum Value" />
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
            name="options.labels.start"
            render={({ field }) => (
              <FormItem>
                <QuestionOptionLabel text="Start Label" />
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="options.labels.end"
            render={({ field }) => (
              <FormItem className="mb-4">
                <QuestionOptionLabel text="End Label" />
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
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
