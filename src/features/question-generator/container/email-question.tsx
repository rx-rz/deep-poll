import { Control } from "react-hook-form";
import { QuestionOptionsMap } from "@/types/questions";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAnswerStore } from "@/store/answer.store";

type EmailQuestionProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["email"];
  required: boolean;
  control: Control<any>;
};

const EmailQuestion = ({
  questionId,
  questionText,
  options,
  required,
  control,
}: EmailQuestionProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const { placeholder, minEmailLength, maxEmailLength } = options;

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>
            {questionText} {required ? <p>Req</p> : <></>}
          </FormLabel>
          <Input
            {...field}
            type="email"
            minLength={minEmailLength ?? 1}
            maxLength={maxEmailLength ?? 255}
            placeholder={placeholder}
            onChange={(e) => {
              field.onChange(e);
              setAnswer(questionId, e.target.value);
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailQuestion;
