import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Star } from "lucide-react";
import { QuestionLabel } from "./question-label";
import { useAnswerStore } from "@/store/answer.store";

type RatingAnswerProps = {
  id: string;
  questionText: string;
  options: QuestionOptionsMap["rating"];
  required: boolean;
  control: Control<any>;
};

export const RatingAnswer = ({
  id,
  questionText,
  options,
  required,
  control,
}: RatingAnswerProps) => {
  const { max } = options;
  const setAnswer = useAnswerStore((state) => state.setAnswer);

  const ratings = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>

          <FormControl>
            <div className="flex items-center">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className={`p-1 ${
                    field.value >= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => {
                    field.onChange(rating);
                    setAnswer(id, rating);
                  }}
                >
                  <Star className="h-5 w-5" />
                </button>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
