import { QuestionCreationCard } from "@/components/question-creation-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { QuestionOptionsMap, useQuestionStore } from "@/store/questions.store";
import { Label } from "@radix-ui/react-label";
import { Hash } from "lucide-react";
import { useState } from "react";
import { QuestionInput } from "../question-input";

type Props = {
  questionId: string;
};
export const NumberQuestionCard = ({ questionId }: Props) => {
  const { questions } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);

  return (
    <QuestionCreationCard
      icon={<Hash size={18} strokeWidth={1.9} />}
      orderNumber={currentQuestion?.orderNumber ?? 1}
      questionId={questionId}
      questionType={"number"}
      questionText={currentQuestion?.questionText ?? ""}
      optionSettings={<NumberQuestionCardOptions questionId={questionId} />}
    />
  );
};

const NumberQuestionCardOptions = ({ questionId }: { questionId: string }) => {
  const [minLength, setMinLength] = useState(1);
  const [maxLength, setMaxLength] = useState(255);
  const [required, setRequired] = useState(false);
  const [allowDecimal, setAllowDecimal] = useState(false);
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);
  const currentQuestionOptions =
    currentQuestion?.options as QuestionOptionsMap["number"];

  const updateQuestionOptions = () => {
    updateQuestion(questionId, {
      options: {
        ...(currentQuestion?.options as QuestionOptionsMap["number"]),
        minLength,
        maxLength,
        allowDecimal,
      },
      required,
    });
  };

  return (
    <>
      <div className="max-w-full">
        <QuestionInput
          placeholder="Enter question"
          questionId={questionId}
          questionText=""
        />
      </div>
      <div className="grid grid-cols-2 gap-2 gap-y-5 font-medium text-left">
        <div>
          <Label className="text-xs">Minimum Number</Label>
          <Input
            type="number"
            defaultValue={currentQuestionOptions?.min ?? 1}
            onChange={(e) => {
              setMinLength(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <Label className="text-xs">Maximum Number</Label>
          <Input
            type="number"
            defaultValue={currentQuestionOptions?.max ?? 255}
            onChange={(e) => {
              setMaxLength(Number(e.target.value));
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="text-xs">Allow Decimal Places</Label>
          <Switch
            className="w-8 h-4 hover:cursor-pointer"
            checked={allowDecimal}
            onCheckedChange={(checked) => {
              setAllowDecimal(checked);
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label className="font-medium text-xs">Required</Label>
          <Switch
            className="w-8 h-4 hover:cursor-pointer"
            checked={required}
            onCheckedChange={(checked) => {
              setRequired(checked);
            }}
          />
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
