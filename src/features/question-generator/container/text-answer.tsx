import { Control } from "react-hook-form";
import { QuestionOptionsMap } from "@/types/questions";

import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Shadcn UI Form Elements
import { useAnswerStore } from "@/store/answer.store";
import { Textarea } from "@/components/ui/textarea";
import { Asterisk } from "lucide-react";
import { QuestionLabel } from "./question-label";

type TextAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["text"];
  required: boolean;
  control: Control<any>;
};

export const TextAnswer = ({
  questionId,
  questionText,
  options,
  required,
  control,
}: TextAnswerProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const { isMultiline, placeholder } = options;
  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem className=" relative">
          <QuestionLabel questionText={questionText} required={required} />
          {isMultiline ? (
            <Textarea
              {...field}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                setAnswer(questionId, e.target.value);
              }}
            />
          ) : (
            <Input
              {...field}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                setAnswer(questionId, e.target.value);
              }}
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
