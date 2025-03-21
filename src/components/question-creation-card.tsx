import { QuestionType, useQuestionStore } from "@/store/questions.store";
import { ChevronDownCircle, ChevronUpCircle, Stars, Trash2Icon } from "lucide-react";
import { ReactNode, useState } from "react";

type Props = {
  icon: ReactNode;
  questionType: QuestionType;
  orderNumber: number;
  questionText: string;
  children: ReactNode;
  questionId: string;
};

export const QuestionCreationCard = ({
  icon,
  questionType,
  orderNumber,
  questionText,
  children,
  questionId,
}: Props) => {
  const [questionOptionsIsOpen, setQuestionOptionsIsOpen] = useState(false);
  const { removeQuestion } = useQuestionStore();

  return (
    <>
      <div className="border-2 focus-within:border-black py-4 px-5">
        <div className="flex justify-between mb-4 text-sm font-medium">
          <div className="flex items-center gap-1">
            {icon}
            <p>{questionType}</p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="hover:cursor-pointer"
              onClick={() => {
                removeQuestion(questionId);
              }}
            >
              <Trash2Icon size={18} strokeWidth={1.9} />
            </button>
            <Stars size={18} strokeWidth={1.9}/>
          </div>
        </div>
        <div className="text-lg font-medium gap-3 flex mb-1">
          <p>{orderNumber}</p>
          <p>{questionText}</p>
        </div>
        {questionOptionsIsOpen ? children : <></>}
        <div className="w-full  flex justify-end items-end mt-4">
          <button
            className="w-fit self-end hover:cursor-pointer"
            onClick={() => setQuestionOptionsIsOpen(!questionOptionsIsOpen)}
          >
            {questionOptionsIsOpen ? (
              <ChevronUpCircle size={18} strokeWidth={1.9} />
            ) : (
              <ChevronDownCircle size={18} strokeWidth={1.9} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
