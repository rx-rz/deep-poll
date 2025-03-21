import { Input } from "@/components/ui/input";

type Props = {
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
};

export const QuestionInput = ({ questionText, setQuestionText }: Props) => {
  return (
    <div className="mb-4">
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
