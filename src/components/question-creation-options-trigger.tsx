import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";

export const QuestionCreationOptionsTrigger = ({
  questionOptionsIsOpen,
  setQuestionOptionsIsOpen,
}: {
  questionOptionsIsOpen: boolean;
  setQuestionOptionsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className="absolute right-5 bottom-5 hover:cursor-pointer"
      onClick={() => setQuestionOptionsIsOpen(!questionOptionsIsOpen)}
    >
      {questionOptionsIsOpen ? (
        <ChevronUpCircle strokeWidth={1.9} size={18} />
      ) : (
        <ChevronDownCircle strokeWidth={1.9} size={18} />
      )}
    </button>
  );
};
