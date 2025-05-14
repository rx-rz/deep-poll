import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
};

export const QuestionInput = ({ questionText, setQuestionText }: Props) => {
  return (
    <div className="my-4">
      <Label className="text-xs mb-2">Question Text</Label>
      <Textarea
        placeholder="Enter question text"
        defaultValue={questionText}
        className="max-w-full"
        onChange={(e) => {
          setQuestionText(e.target.value);
        }}
      />
      {questionText.length === 0 && (
        <p className="text-red-500 text-xs mt-1">Question text is required</p>
      )}
    </div>
  );
};
