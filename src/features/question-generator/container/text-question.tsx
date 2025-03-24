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

type TextQuestionProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["text"];
  required: boolean;
  control: Control<any>;
}

const TextQuestion = ({
  questionId,
  questionText,
  options,
  required,
  control,
}: TextQuestionProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const { isMultiline, maxAnswerLength, minAnswerLength, placeholder } =
    options;
  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem className=" relative">
          <FormLabel>
            {questionText} {required ? <p>Req</p> : <></>}
          </FormLabel>
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

export default TextQuestion;
