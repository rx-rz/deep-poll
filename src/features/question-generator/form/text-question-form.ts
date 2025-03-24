import { QuestionOptionsMap } from "@/types/questions";

type Props = {
  required: boolean;
  questionText: string;
  questionId: string;
  orderNumber: string;
  options: QuestionOptionsMap["text"];
};

const useTextQuestionForm = ({
  options,
  orderNumber,
  questionId,
  required,
  questionText,
}: Props) => {
    
};
