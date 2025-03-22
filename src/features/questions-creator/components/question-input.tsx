import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
};

export const QuestionInput = ({ questionText, setQuestionText }: Props) => {
  return (
    <div className="my-4">
      <Label className="text-xs">Question Text</Label>
      <Input
        placeholder="Enter question text"
        defaultValue={questionText}
        className="max-w-full"
        onChange={(e) => {
          setQuestionText(e.target.value);
        }}
      />
    </div>
  );
};
