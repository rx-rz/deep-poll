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
//   required,
//   orderNumber,
}: Partial<Props>) => {
  return (
    <div>
      <Label>{questionText}</Label>
      <Input
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
      ></Input>
    </div>
  );
};
