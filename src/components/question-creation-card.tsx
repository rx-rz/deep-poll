import {
  ChevronDownCircle,
  ChevronUpCircle,
  Stars,
  TrashIcon,
} from "lucide-react";
import { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { QuestionType } from "@/types/questions";
import { useQuestionStore } from "@/store/questions.store";

import { Checkbox } from "./ui/checkbox";

type Props = {
  icon: ReactNode | any;
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

  const [open, setOpen] = useState(false);
  return (
    <>
      <div className=" bg-white/20 backdrop-filter backdrop-blur-lg backdrop-saturate-150 min-w-lg max-w-lg  border rounded-lg shadow-sm  py-4 px-5">
        <div className="flex justify-between mb-4 text-sm font-medium">
          <div className="flex items-center gap-1">
            {icon}
            <p className="text-xs font-medium">{questionType}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Stars
              size={19}
              strokeWidth={1.5}
              stroke="#4392F1"
              fill="#4392F1"
            />
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger className="hover:cursor-pointer">
                <TrashIcon size={19} strokeWidth={1.5} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <RemoveQuestionAlertCard
                  questionId={questionId}
                  setOpen={setOpen}
                />
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="md:text-lg font-medium gap-3 flex mb-1">
          <p>{orderNumber}</p>
          <p>{questionText}</p>
        </div>
        <div className="my-4">{questionOptionsIsOpen ? children : <></>}</div>
        <div className="w-full flex justify-between items-center mt-4">
          <div className="flex gap-2 mt-5">
            <Checkbox

            // checked={questionIsRequired}
            // onCheckedChange={(checked) => setQuestionIsRequired(checked)}
            />
            <p className="font-medium text-xs">Required</p>
          </div>
          <button
            className="w-fit self-end hover:cursor-pointer"
            onClick={() => setQuestionOptionsIsOpen(!questionOptionsIsOpen)}
          >
            {questionOptionsIsOpen ? (
              <ChevronUpCircle size={19} strokeWidth={1.5} />
            ) : (
              <ChevronDownCircle size={19} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

const RemoveQuestionAlertCard = ({
  questionId,
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionId: string;
}) => {
  const { removeQuestion } = useQuestionStore();
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to delete this question?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          question.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="bg-gradient-to-br from-red-500 to-red-700 hover:bg-red-500 text-white"
          onClick={() => {
            removeQuestion(questionId);
            setOpen(false);
          }}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};
