import { Label } from "@/components/ui/label";

type Props = {
  text: string;
};
export const QuestionOptionLabel = ({ text }: Props) => {
  return <Label>{text}</Label>;
};
