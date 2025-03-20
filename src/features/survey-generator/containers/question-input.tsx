import { Input } from "@/components/ui/input";
import { useQuestionStore } from "@/store/questions.store";

type Props = {
  placeholder: string;
  questionText: string;
  questionId: string;
};
export const QuestionInput = ({
  placeholder,
  questionId,
  questionText,
}: Props) => {
  const { updateQuestion } = useQuestionStore();
  return (
    <Input
      placeholder={placeholder}
      defaultValue={questionText}
      className="max-w-full"
      onChange={(e) => {
        updateQuestion(questionId ?? "", {
          questionText: e.target.value,
        });
      }}
    />
  );
};
