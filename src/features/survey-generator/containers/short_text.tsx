import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  placeholder: string;
  questionText: string;
  maxLength: number;
  minLength: number;
  required: boolean;
  orderNumber: number;
};

export const ShortText = ({
  placeholder,
  maxLength,
  minLength,
  questionText,
}: //   required,
//   orderNumber,
Partial<Props>) => {
  return (
    <div className="border-2 border-black  p-5 shadow-none min-h-[100px] rounded-none">
    
      <Label className="mb-4">{questionText}</Label>
      <Input
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
      ></Input>
    </div>
  );
};
