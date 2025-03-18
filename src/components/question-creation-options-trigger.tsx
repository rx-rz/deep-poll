import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import { Button } from "./ui/button";

export const QuestionCreationOptionsTrigger = ({
  questionOptionsIsOpen,
  setQuestionOptionsIsOpen,
}: {
  questionOptionsIsOpen: boolean;
  setQuestionOptionsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Button
      variant={"ghost"}
      className="absolute right-0 bottom-0"
      onClick={() => setQuestionOptionsIsOpen(!questionOptionsIsOpen)}
    >
      {questionOptionsIsOpen ? (
        <ChevronUpCircle strokeWidth={1.9} size={18} />
      ) : (
        <ChevronDownCircle strokeWidth={1.9} size={18} />
      )}
    </Button>
  );
};
