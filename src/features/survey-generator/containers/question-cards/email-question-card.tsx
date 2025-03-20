import { QuestionCreationCard } from "@/components/question-creation-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useQuestionStore } from "@/store/questions.store";
import { Mail } from "lucide-react";
import { useCallback, useState } from "react";
import { QuestionInput } from "../question-input";

type Props = {
  questionId: string;
};

export const EmailQuestionCard = ({ questionId }: Props) => {
  const { questions } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);

  return (
    <QuestionCreationCard
      icon={<Mail size={18} strokeWidth={1.9} />}
      questionId={questionId}
      orderNumber={currentQuestion?.orderNumber ?? 1}
      questionText={currentQuestion?.questionText ?? ""}
      questionType={"email"}
      optionSettings={<EmailQuestionCardOptions questionId={questionId} />}
    />
  );
};

const EmailQuestionCardOptions = ({ questionId }: { questionId: string }) => {
  const [required, setRequired] = useState(false);
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);
  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      setRequired(!required);
      updateQuestion(questionId ?? "", { required: checked });
    },
    [updateQuestion, questionId]
  );

  const updateQuestionOptions = () => {
    updateQuestion(questionId ?? "", {
      required,
    });
  };
  return (
    <>
      <QuestionInput
        placeholder="Enter question"
        questionId={questionId}
        questionText=""
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="w-full mt-4  text-xs flex items-center gap-4 ">
          <div className="flex justify-between gap-2">
            <p className="font-medium">Required</p>
            <Switch
              className="w-8 h-4 hover:cursor-pointer"
              checked={currentQuestion?.required}
              onCheckedChange={handleCheckedChange}
            />
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          updateQuestionOptions();
        }}
      >
        Save
      </Button>
    </>
  );
};
