import { QuestionCreationCard } from "@/components/question-creation-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { QuestionOptionsMap, useQuestionStore } from "@/store/questions.store";
import { Label } from "@radix-ui/react-label";
import { Edit, Hash, Stars, Trash } from "lucide-react";
import { useCallback, useState } from "react";

type Props = {
  questionId: string;
};
export const NumberInput = ({ questionId }: Props) => {
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);
  const currentQuestionOptions =
    currentQuestion?.options as QuestionOptionsMap["number"];

  return (
    <QuestionCreationCard
      icon={<Hash />}
      orderNumber={currentQuestion?.orderNumber ?? 1}
      questionType={"text"}
      optionSettings={<NumberQuestionCardOptions questionId={questionId} />}
    >
      <Label className="mb-2 mt-[3px]">Question</Label>
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
