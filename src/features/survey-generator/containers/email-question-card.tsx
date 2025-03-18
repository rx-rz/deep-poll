import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQuestionStore } from "@/store/questions.store";
import { Mail, Stars, Trash } from "lucide-react";
import { useCallback } from "react";

type Props = {
  questionId: string;
};

export const EmailQuestionCard = ({ questionId }: Props) => {
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);

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
          <p className="text-xs font-medium opacity-80">Email</p>
          <Mail className="mr-2 h-3 w-3 " strokeWidth={2} />
        </div>
        <div className="flex gap-2  right-5 top-3">
          <Stars className="h-5 w-5" strokeWidth={1.5} size={18} />
        </div>
      </div>
      <div className="flex justify-between items-start gap-5 mt-5">
        <p className=" text-sm font-bold justify-center items-center flex rounded-full">
          {currentQuestion?.orderNumber}
        </p>

        <div className="w-full relative">
          <Label className="mb-2 mt-[3px]">Email placeholder</Label>
          <Input
            placeholder={"Enter your email"}
            type="email"
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
