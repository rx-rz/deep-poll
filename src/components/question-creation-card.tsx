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
import { Question, QuestionType } from "@/types/questions";

import { Checkbox } from "./ui/checkbox";
import { useDeleteQuestion } from "@/features/questions/api/use-delete-question";
import { useQuestionStore } from "@/store/questions.store";

type Props = {
  icon: ReactNode | any;
  question: Question;
  children: ReactNode;
};

export const QuestionCreationCard = ({ icon, question, children }: Props) => {
  const {
    createdAt,
    id,
    orderNumber,
    questionType,
    required,
    surveyId,
    questionText,
  } = question;
  const [questionOptionsIsOpen, setQuestionOptionsIsOpen] = useState(false);
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const addApiQueuedQuestion = useQuestionStore(
    (state) => state.addApiQueuedQuestion
  );
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="four-border border bg-background    md:min-w-lg max-w-lg    rounded-none    p-4">
        <div className="flex justify-between mb-4 text-sm font-medium">
          <div className="flex items-center text-primary gap-1">
            <div className="text-primary"> {icon}</div>
            <p className="text-xs font-medium">{questionType}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Stars
              size={19}
              strokeWidth={1.5}
              stroke="#0127f0"
              fill="#0127f0"
            />
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger className="hover:cursor-pointer">
                <TrashIcon size={19} strokeWidth={1.5} stroke="#0127f0" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <RemoveQuestionAlertCard id={id} setOpen={setOpen} />
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
              defaultChecked={question.required === true}
              onCheckedChange={(checked) => {
                updateQuestion(id, {
                  required: checked === true,
                });
                addApiQueuedQuestion(id, {
                  ...question,
                  required: checked === true,
                });
              }}
            />
            <p className="font-medium text-xs text-primary">Required</p>
          </div>
          <button
            className="w-fit self-end hover:cursor-pointer text-primary"
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
  id,
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) => {
  const { handleDeleteQuestion } = useDeleteQuestion();
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
            handleDeleteQuestion(id);
            setOpen(false);
          }}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};
