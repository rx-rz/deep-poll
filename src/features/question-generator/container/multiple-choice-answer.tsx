import { useAnswerStore } from "@/store/answer.store";
import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { QuestionLabel } from "./question-label";
type MultipleChoiceAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["multiple_choice"];
  required: boolean;
  control: Control<any>;
};

export const MultipleChoiceAnswer = ({
  questionId,
  questionText,
  options,
  required,
  control,
}: MultipleChoiceAnswerProps) => {
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const { allowOther, choices, randomizeOrder } = options;

  function shuffleArray(array: string[]) {
    const shuffled = [...array]; // Create a copy to avoid mutating the original array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  }

  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <QuestionLabel questionText={questionText} required={required} />
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {!randomizeOrder
                ? choices.map((choice) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={choice}
                    >
                      <FormControl>
                        <RadioGroupItem value={choice} />
                      </FormControl>
                      <FormLabel className="font-normal">{choice}</FormLabel>
                    </FormItem>
                  ))
                : shuffleArray(choices).map((choice) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={choice}
                    >
                      <FormControl>
                        <RadioGroupItem value={choice} />
                      </FormControl>
                      <FormLabel className="font-normal">{choice}</FormLabel>
                    </FormItem>
                  ))}
            </RadioGroup>
            {allowOther ? (
              <>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setAnswer(questionId, e.target.value);
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
