import { FormLabel } from "@/components/ui/form";
import { Asterisk } from "lucide-react";

type Props = {
  required: boolean;
  questionText: string;
};
export const QuestionLabel = ({questionText, required}: Props) => {
  return (
    <FormLabel>
      {questionText}
      {required ? (
        <Asterisk size={16} stroke="#ff0000" strokeWidth={0.9} />
      ) : (
        <></>
      )}
    </FormLabel>
  );
};
