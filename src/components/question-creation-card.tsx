import { QuestionType, useQuestionStore } from "@/store/questions.store";
import { Stars, Trash } from "lucide-react";
import { ReactNode, useState } from "react";
import { QuestionCreationOptionsTrigger } from "./question-creation-options-trigger";
import { QuestionOptionsCard } from "./question-options-card";

type Props = {
  questionType: QuestionType;
  questionText: string;
  questionId: string;
  icon: ReactNode;
  orderNumber: number;
  optionSettings: ReactNode;
};

export const QuestionCreationCard = ({
  icon,
  orderNumber,
  questionType,
  optionSettings,
  questionText,
  questionId,
}: Props) => {
  const [questionOptionsIsOpen, setQuestionOptionsIsOpen] = useState(true);
  const { removeQuestion } = useQuestionStore();
  return (
    <div className="border-2 w-full focus-within:border-black relative p-5 shadow-none h-full pb-14 rounded-none">
      <div className="flex justify-between items-center">
        <div className="left-5 top-3 flex gap-1 items-center">
          <p className="text-xs font-medium opacity-80">{questionType}</p>
          {icon}
        </div>
        <div className="flex gap-2 right-5 top-3">
          <Stars strokeWidth={1.9} size={18} />
          <button
            className="hover:cursor-pointer"
            onClick={() => {
              removeQuestion(questionId);
            }}
          >
            <Trash strokeWidth={1.9} size={18} />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start gap-5 mt-8">
        <p className="text-lg font-bold justify-center items-center flex rounded-full">
          {orderNumber}
        </p>
        <div className="w-full">
          <div className="mb-2 text-lg">
            <p className="text-left font-medium break-words">{questionText}</p>
          </div>
          <QuestionCreationOptionsTrigger
            questionOptionsIsOpen={questionOptionsIsOpen}
            setQuestionOptionsIsOpen={setQuestionOptionsIsOpen}
          />
          {questionOptionsIsOpen ? (
            <QuestionOptionsCard>{optionSettings}</QuestionOptionsCard>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
