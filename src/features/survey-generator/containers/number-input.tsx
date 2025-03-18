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
  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      updateQuestion(questionId ?? "", { required: checked });
    },
    [updateQuestion, questionId] // Dependencies
  );

  return (
    <div className="border-2 focus-within:border-black  relative  p-5 shadow-none min-h-[100px] rounded-none">
      <div className="flex justify-between items-center">
        <div className=" left-5 top-3 flex gap-1 items-center">
          <p className="text-xs font-medium opacity-80">Number</p>
          <Hash className="mr-2 h-3 w-3 " strokeWidth={2} />
        </div>
        <div className="flex gap-2  right-5 top-3">
          <Stars className="h-5 w-5" strokeWidth={1.5} size={18} />
          <OptionsTrigger questionId={questionId ?? ""} />
        </div>
      </div>
      <div className="flex justify-between items-start gap-5 mt-5">
        <p className=" text-sm font-bold justify-center items-center flex rounded-full">
          {currentQuestion?.orderNumber}
        </p>

        <div className="w-full relative">
          <Label className="mb-2 mt-[3px]">Question</Label>
          <Input
            placeholder={currentQuestionOptions?.placeholder}
            defaultValue={currentQuestion?.questionText}
            onChange={(e) => {
              updateQuestion(questionId ?? "", {
                questionText: e.target.value,
              });
            }}
          ></Input>
          <div className="w-full mt-4 justify-end  text-xs flex items-center gap-4 ">
            <div className="flex justify-between gap-1">
              <p>Required</p>
              <Switch
                className="w-8 h-4 hover:cursor-pointer"
                checked={currentQuestion?.required}
                onCheckedChange={handleCheckedChange}
              />
            </div>
            <Trash strokeWidth={1.5} size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

const OptionsTrigger = ({ questionId }: { questionId: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Edit className="h-5 w-5" strokeWidth={1.5} size={18} />
      </DialogTrigger>
      <DialogContent className="rounded-none">
        <TextInputOptions questionId={questionId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

const TextInputOptions = ({
  questionId,
  setOpen,
}: {
  questionId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [minLength, setMinLength] = useState(1);
  const [maxLength, setMaxLength] = useState(255);
  const [allowDecimal, setAllowDecimal] = useState(false);
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);
  const currentQuestionOptions =
    currentQuestion?.options as QuestionOptionsMap["text"];

  const updateQuestionOptions = () => {
    updateQuestion(questionId ?? "", {
      options: {
        ...(currentQuestion?.options as QuestionOptionsMap["text"]),
        minLength,
        maxLength,
      },
    });
  };

  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      updateQuestion(questionId ?? "", { : checked });
    },
    [updateQuestion, questionId] // Dependencies
  );
  return (
    <div className="flex flex-col gap-5 mt-10">
      <div>
        <Label className="mb-2">Minimum Question Length</Label>
        <Input
          type="text"
          defaultValue={currentQuestionOptions?.minLength ?? 1}
          onChange={(e) => {
            setMinLength(Number(e.target.value));
          }}
        />
      </div>
      <div>
        <Label className="mb-2">Maximum Question Length</Label>
        <Input
          defaultValue={currentQuestionOptions?.maxLength ?? 255}
          onChange={(e) => {
            setMaxLength(Number(e.target.value));
          }}
        />
      </div>
      <div>
        <Label className="mb-2">Allow Decimal Places</Label>
        <Switch
          className="w-8 h-4 hover:cursor-pointer"
          checked={currentQuestion?.required}
          onCheckedChange={handleCheckedChange}
        />
      </div>
      <Button
        onClick={() => {
          updateQuestionOptions();
          setOpen(false);
        }}
      >
        Save
      </Button>
    </div>
  );
};
