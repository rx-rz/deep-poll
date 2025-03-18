import { QuestionCreationCard } from "@/components/question-creation-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { QuestionOptionsMap, useQuestionStore } from "@/store/questions.store";
import { Label } from "@radix-ui/react-label";
import { Hash } from "lucide-react";
import { useState } from "react";

type Props = {
  questionId: string;
};
export const NumberQuestionCard = ({ questionId }: Props) => {
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);
  const currentQuestionOptions =
    currentQuestion?.options as QuestionOptionsMap["number"];

  return (
    <QuestionCreationCard
      icon={<Hash size={18} strokeWidth={1.9}/>}
      orderNumber={currentQuestion?.orderNumber ?? 1}
      questionType={"number"}
      optionSettings={<NumberQuestionCardOptions questionId={questionId} />}
    >
      <Input
        placeholder={currentQuestionOptions?.placeholder}
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
    <div className="flex flex-col gap-5 mt-10">
      <div>
        <Label className="mb-2">Minimum Question Length</Label>
        <Input
          type="text"
          defaultValue={currentQuestionOptions?.min ?? 1}
          onChange={(e) => {
            setMinLength(Number(e.target.value));
          }}
        />
      </div>
      <div>
        <Label className="mb-2">Maximum Question Length</Label>
        <Input
          defaultValue={currentQuestionOptions?.max ?? 255}
          onChange={(e) => {
            setMaxLength(Number(e.target.value));
          }}
        />
      </div>
      <div>
        <Label className="mb-2">Allow Decimal Places</Label>
        <Switch
          className="w-8 h-4 hover:cursor-pointer"
          checked={currentQuestionOptions.allowDecimal}
          onCheckedChange={(checked) => {
            setAllowDecimal(checked);
          }}
        />
      </div>
      <div>
        <Label className="mb-2">Required</Label>
        <Switch
          className="w-8 h-4 hover:cursor-pointer"
          checked={currentQuestion?.required}
          onCheckedChange={(checked) => {
            setRequired(checked);
          }}
        />
      </div>
      <Button
        onClick={() => {
          updateQuestionOptions();
        }}
      >
        Save
      </Button>
    </div>
  );
};
