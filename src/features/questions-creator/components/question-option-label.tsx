import { Label } from "@/components/ui/label";

type Props = {
  text: string;
};
export const QuestionOptionLabel = ({ text }: Props) => {
  return <Label className="text-xs mb-0">{text}</Label>;
};
