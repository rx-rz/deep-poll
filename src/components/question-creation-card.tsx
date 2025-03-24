import { QuestionType, useQuestionStore } from "@/store/questions.store";
import {
  ChevronDownCircle,
  ChevronUpCircle,
  Stars,
  Trash2Icon,
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

  const [open, setOpen] = useState(false);
  return (
    <>
      <div className=" bg-white border-black border-3 py-4 px-5">
        <div className="flex justify-between mb-4 text-sm font-medium">
          <div className="flex items-center gap-1">
            {icon}
            <p className="text-xs font-medium">{questionType}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Stars size={18} strokeWidth={3} stroke="#4392F1" />
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger className="hover:cursor-pointer">
                <Trash2Icon size={18} strokeWidth={1.9} />
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-none">
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
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="bg-red-500 hover:bg-red-500 text-white"
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
