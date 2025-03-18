import { QuestionCreationCard } from "@/components/question-creation-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { QuestionOptionsMap, useQuestionStore } from "@/store/questions.store";
import { Text } from "lucide-react";
import { useCallback, useState } from "react";

type Props = {
  questionId: string;
};

export const TextQuestionCard = ({ questionId }: Props) => {
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);
  const currentQuestionOptions =
    currentQuestion?.options as QuestionOptionsMap["text"];
  return (
    <QuestionCreationCard
      icon={<Text />}
      orderNumber={currentQuestion?.orderNumber ?? 1}
      questionType={"text"}
      optionSettings={<TextQuestionCardOptions questionId={questionId} />}
    >
      <Label className="mb-2 mt-[3px]">Question</Label>
      <Input
        placeholder={currentQuestionOptions?.placeholder}
        maxLength={currentQuestionOptions?.maxLength}
        minLength={currentQuestionOptions?.minLength}
        defaultValue={currentQuestion?.questionText}
        onChange={(e) => {
          updateQuestion(questionId ?? "", {
            questionText: e.target.value,
          });
        }}
      />
    </QuestionCreationCard>
  );
};

const TextQuestionCardOptions = ({ questionId }: { questionId: string }) => {
  const [minLength, setMinLength] = useState(1);
  const [maxLength, setMaxLength] = useState(255);
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);
  const currentQuestionOptions =
    currentQuestion?.options as QuestionOptionsMap["text"];
  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      updateQuestion(questionId ?? "", { required: checked });
    },
    [updateQuestion, questionId] // Dependencies
  );

  const updateQuestionOptions = () => {
    updateQuestion(questionId ?? "", {
      options: {
        ...(currentQuestion?.options as QuestionOptionsMap["text"]),
        minLength,
        maxLength,
        
      },
    });
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className=" text-xs">Minimum Question Length</Label>
          <Input
            type="text"
            defaultValue={currentQuestionOptions?.minLength ?? 1}
            onChange={(e) => {
              setMinLength(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <Label className=" text-xs">Maximum Question Length</Label>
          <Input
            defaultValue={currentQuestionOptions?.maxLength ?? 255}
            onChange={(e) => {
              setMaxLength(Number(e.target.value));
            }}
          />
        </div>
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
