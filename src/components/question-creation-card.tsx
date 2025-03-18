import { QuestionType } from "@/store/questions.store";
import { Stars, Trash } from "lucide-react";
import { ReactNode, useState } from "react";
import { QuestionCreationOptionsTrigger } from "./question-creation-options-trigger";
import { QuestionOptionsCard } from "./question-options-card";

type Props = {
  questionType: QuestionType;
  questionId?: string;
  icon: ReactNode;
  orderNumber: number;
  children: ReactNode;
  optionSettings: ReactNode;
};
export const QuestionCreationCard = ({
  icon,
  children,
  orderNumber,
  questionType,
  optionSettings,
}: Props) => {
  const [questionOptionsIsOpen, setQuestionOptionsIsOpen] = useState(false);
  return (
    <div className="border-2 focus-within:border-black  relative  p-5 shadow-none min-h-[100px] rounded-none">
      <div className="flex justify-between items-center">
        <div className=" left-5 top-3 flex gap-2 items-center">
          <p className="text-xs font-medium opacity-80">{questionType}</p>
          {icon}
        </div>
        <div className="flex gap-2  right-5 top-3">
          <Stars strokeWidth={1.9} size={18} />
          <Trash strokeWidth={1.9} size={18} />
        </div>
      </div>
      <div className="flex justify-between items-start gap-5 mt-8">
        <p className=" text-sm font-bold justify-center items-center flex rounded-full">
          {orderNumber}
        </p>

        <div className="w-full pb-12 relative">
          <>{children}</>
          <>
            <QuestionCreationOptionsTrigger
              questionOptionsIsOpen={questionOptionsIsOpen}
              setQuestionOptionsIsOpen={setQuestionOptionsIsOpen}
            />
          </>
          {questionOptionsIsOpen ? (
            <QuestionOptionsCard>{optionSettings}</QuestionOptionsCard>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};
